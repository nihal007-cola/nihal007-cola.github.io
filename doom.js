var Module = window.Module || {};

Module.canvas = Module.canvas;
Module.arguments = Module.arguments || ["-iwad", "freedoom.wad"];

Module.locateFile = function(path) {
  return path;
};

Module.print = function(text) {
  console.log(text);
};

Module.printErr = function(text) {
  console.error(text);
};

Module.preRun = Module.preRun || [];
Module.postRun = Module.postRun || [];

Module.preRun.push(function() {
  console.log("WASM loading...");
});

Module.postRun.push(function() {
  console.log("DOOM started");
});

function createDoomModule() {
  var wasmUrl = "doom.wasm";
  
  function loadWasmWithFetch() {
    return fetch(wasmUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Failed to fetch doom.wasm: " + response.status);
        }
        return response.arrayBuffer();
      })
      .then(function(bytes) {
        return WebAssembly.instantiate(bytes, {});
      })
      .catch(function(error) {
        console.error("WASM loading failed:", error);
        throw error;
      });
  }
  
  function instantiateWasm(imports, successCallback) {
    loadWasmWithFetch()
      .then(function(result) {
        successCallback(result.instance);
        console.log("WASM loaded");
      })
      .catch(function(error) {
        console.error("WASM instantiation failed:", error);
        if (Module.onAbort) Module.onAbort(error);
      });
    return {};
  }
  
  Module.instantiateWasm = instantiateWasm;
  
  function checkWadAvailability() {
    return fetch("freedoom.wad", { method: "HEAD" })
      .then(function(response) {
        if (!response.ok) {
          console.error("freedoom.wad not found or inaccessible");
          return false;
        }
        console.log("freedoom.wad is accessible");
        return true;
      })
      .catch(function() {
        console.error("Cannot access freedoom.wad");
        return false;
      });
  }
  
  checkWadAvailability().then(function(wadOk) {
    if (!wadOk) {
      console.error("WARNING: freedoom.wad may be missing, DOOM may not work correctly");
    }
  });
  
  return Module;
}

var doomModule = createDoomModule();

if (!window.Module) {
  window.Module = doomModule;
}

if (typeof Module === "undefined") {
  window.Module = doomModule;
}
