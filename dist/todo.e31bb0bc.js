// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict"; //**дата на мобильнике */

var today = new Date();
var year = today.getFullYear();
var monthNow = today.getMonth() + 1;

var getDay = function getDay() {
  var daysArr = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  return daysArr[today.getDay()];
};

document.querySelector(".myDay").innerHTML = getDay();

var getDat = function getDat() {
  var montsArr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
  return montsArr[today.getMonth()];
};

document.querySelector(".myData").innerHTML = today.getDate() + " " + getDat() + " " + year + " " + "г."; //* бегущее время на мобильнике**//

setInterval(myTimer, 1000);

function myTimer() {
  var today = new Date();
  var second = today.getSeconds();
  var minut = today.getMinutes();

  if (+second < 10) {
    second = "0" + second;
  }

  if (+minut < 10) {
    minut = "0" + minut;
  }

  document.getElementById("myTime").innerHTML = today.getHours() + ":" + minut + ":" + second;
} //**календарик на мобильнике**/


var getmonth = function getmonth() {
  var monthArr = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  return monthArr[today.getMonth()];
};

document.querySelector(".month").innerHTML = getmonth() + " " + year + " " + "г."; //**Таблица-месяц**//

function createCalendar(elem, year, month) {
  var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12

  var d = new Date(year, mon);
  var table = "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>"; // пробелы для первого ряда до первого дня месяца
  // * * * 1  2  3  4

  for (var i = 0; i < gettDay(d); i++) {
    table += "<td></td>";
  } // создаём <td> ячейки календаря с датами


  while (d.getMonth() == mon) {
    table += "<td>" + d.getDate() + "</td>";

    if (gettDay(d) % 7 == 6) {
      // вс, последний день - перевод строки
      table += "</tr><tr>";
    }

    d.setDate(d.getDate() + 1);
  } // добиваем таблицу пустыми ячейками, если нужно


  if (gettDay(d) != 0) {
    for (var _i = gettDay(d); _i < 7; _i++) {
      table += "<td></td>";
    }
  } // закрываем таблицу


  table += "</tr></table>";
  elem.id = "tbl";
  elem.innerHTML = table;
}

function gettDay(date) {
  // получаем номер дня недели, от 0 (пн) до 6 (вс)
  var day = date.getDay();
  if (day == 0) day = 7; // делаем воскресенье (0) последним днем

  return day - 1;
}

createCalendar(calendar, year, monthNow); // ***TODO list***/

var ul = document.querySelector("#list");
var input = document.getElementById("toDoInput");
var addBtn = document.getElementById("addBtn");
input.addEventListener("keypress", validationPress);
addBtn.addEventListener("click", validation);
var items = JSON.parse(localStorage.getItem("ToDo")) || []; ////*генерация ID*////

var setId = new Set();

function creatId() {
  var newId = Math.floor(Math.random() * 10000000);

  if (!setId.has(newId)) {
    setId.add(newId);
    return newId;
  } else {
    return creatId();
  }
}

function validationPress(event) {
  if (event.keyCode == 13) {
    if (input.value === "" || input.value === null) {
      alert("Введите данные");
    } else {
      createObj();
    }
  }
}

function validation() {
  if (input.value === "" || input.value === null) {
    alert("Введите данные");
  } else {
    createObj();
  }
}

function createObj() {
  var idtodo = creatId();
  var todoItem = {
    value: input.value,
    checked: false,
    id: idtodo
  };
  items.push(todoItem);
  localStorage.setItem("ToDo", JSON.stringify(items));
  input.value = "";
  createTodo();
}

function createTodo() {
  ul.innerHTML = "";

  for (var i = 0; i < items.length; i++) {
    var li = document.createElement("li");
    li.prepend(items[i].value);
    li.setAttribute("id", +items[i].id);
    li.className = items[i].checked ? "checked" : "";
    var deleteIcon = document.createElement("span");
    deleteIcon.className = "icon__delit";
    li.append(deleteIcon);
    ul.prepend(li);
    setId.add(items[i].id); //нужно при перезагрузке страницы
  }
}

ul.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    event.stopPropagation();

    for (var i = 0; i < items.length; ++i) {
      if (items[i].id == event.target.getAttribute("id")) {
        items[i].checked = !items[i].checked;
        localStorage.setItem("ToDo", JSON.stringify(items));
      }
    }
  } else if (event.target.tagName === "SPAN") {
    event.target.parentNode.remove();
    event.stopPropagation();
    var iD = +event.target.parentNode.getAttribute("id");
    items = items.filter(function (val) {
      return +val.id != iD;
    });
    localStorage.setItem("ToDo", JSON.stringify(items));
  }
});

if (localStorage.getItem("ToDo")) {
  createTodo();
}
},{}],"C:/Users/37533/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62975" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/37533/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/todo.e31bb0bc.js.map