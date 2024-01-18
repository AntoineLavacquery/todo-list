/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/startOfDay.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/compareAsc.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/eachDayOfInterval.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/startOfWeek.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/endOfWeek.mjs");


class Storage {
    getProjectObj(project) {
        return localStorage.getItem(project)
            ? JSON.parse(localStorage.getItem(project))
            : [];
    }

    addTodo(newTodo) {
        const projectObj = this.getProjectObj(newTodo.project);

        if (projectObj) {
            const todoExists = projectObj.some(
                (todo) =>
                    todo.title === newTodo.title &&
                    todo.dueDate === newTodo.dueDate
            );

            if (!todoExists) {
                projectObj.push(newTodo);
                localStorage.setItem(
                    newTodo.project,
                    JSON.stringify(projectObj)
                );
            } else {
                alert(
                    `${newTodoCard.title} with ${newTodoCard.dueDate} already exists`
                );
            }
        } else {
            localStorage.setItem(newTodo.project, JSON.stringify([newTodo]));
        }
    }

    addProject(project) {
        localStorage.setItem(project, JSON.stringify([]));
    }

    deleteTodo(todoToDelete) {
        const projectsNames = this.getProjectsNames();
        projectsNames.forEach((projectName) => {
            const projectObj = this.getProjectObj(projectName);
            const todoIndex = projectObj.findIndex((todo) =>
                this.areTodosEqual(todo, todoToDelete)
            );

            if (todoIndex !== -1) {
                projectObj.splice(todoIndex, 1);
                localStorage.setItem(projectName, JSON.stringify(projectObj));
            }
        });
    }

    deleteProject(project) {
        localStorage.removeItem(project);
    }

    display() {
        console.log({ localStorage });
    }

    wipe() {
        localStorage.clear();
    }

    getProjectsNames() {
        const projects = [];
        for (let i = 0; i < localStorage.length; i++) {
            const project = localStorage.key(i);
            projects.push(project);
        }
        return projects;
    }

    getAllTodos() {
        let allProjects = [];
        const projectsNames = this.getProjectsNames();
        projectsNames.forEach((projectName) => {
            const projectObj = this.getProjectObj(projectName);

            for (const project of projectObj) {
                allProjects.push(project);
            }
        });
        return allProjects;
    }

    getTodaysTodos() {
        const allTodos = this.getAllTodos();
        const currentDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(new Date());
        const todaysTodos = allTodos.filter((todo) => {
            return !(0,date_fns__WEBPACK_IMPORTED_MODULE_1__.compareAsc)((0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(new Date(todo.dueDate)), currentDate);
        });
        return todaysTodos;
    }

    getThisWeekTodos() {
        const allTodos = this.getAllTodos();
        const currentDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(new Date());
        const daysOfWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.eachDayOfInterval)({
            start: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(currentDate),
            end: (0,date_fns__WEBPACK_IMPORTED_MODULE_4__.endOfWeek)(currentDate),
        });
        const thisWeekTodos = allTodos.filter((todo) => {
            const todoDate = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(new Date(todo.dueDate));
            return daysOfWeek.some((day) => +day === +todoDate);
        });
        return thisWeekTodos;
    }

    areTodosEqual(todo1, todo2) {
        return (
            todo1.title === todo2.title &&
            todo1.description === todo2.description &&
            todo1.dueDate === todo2.dueDate &&
            todo1.priority === todo2.priority &&
            todo1.notes === todo2.notes
        );
    }
}


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/compareAsc.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/compareAsc.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareAsc: () => (/* binding */ compareAsc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const _dateLeft = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateLeft);
  const _dateRight = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(dateRight);

  const diff = _dateLeft.getTime() - _dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compareAsc);


/***/ }),

/***/ "./node_modules/date-fns/eachDayOfInterval.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/eachDayOfInterval.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   eachDayOfInterval: () => (/* binding */ eachDayOfInterval)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * The {@link eachDayOfInterval} function options.
 */

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(interval, options) {
  const startDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(interval.start);
  const endDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(interval.end);

  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+currentDate <= endTime) {
    dates.push((0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eachDayOfInterval);


/***/ }),

/***/ "./node_modules/date-fns/endOfWeek.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/endOfWeek.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   endOfWeek: () => (/* binding */ endOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/storage */ "./src/modules/storage.js");



class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title),
            (this.project = project),
            (this.dueDate = dueDate),
            (this.priority = priority);
    }
}

const todoContainer = document.querySelector("div#main");

function appendTodoToDOM(todo) {
    console.log("Coucou");
    const todoElement = document.createElement("div");
    todoElement.classList =
        "alert alert-secondary alert-dismissible fade show d-flex justify-content-between";

    const leftPart = document.createElement("div");
    leftPart.classList = "d-flex gap-2";

    const checkbox = document.createElement("input");
    checkbox.id = "checkbox";
    checkbox.classList = "form-check-input";
    checkbox.type = "checkbox";

    const title = document.createElement("span");
    title.id = title;
    title.innerText = todo.title;

    leftPart.appendChild(checkbox);
    leftPart.appendChild(title);

    const timeRemaining = document.createElement("div");
    timeRemaining.id = "remaining";
    timeRemaining.innerHTML = todo.dueDate;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");

    todoElement.appendChild(leftPart);
    todoElement.appendChild(timeRemaining);
    todoElement.appendChild(closeButton);

    todoContainer.appendChild(todoElement);
}

const storage = new _modules_storage__WEBPACK_IMPORTED_MODULE_0__["default"]();

const todo1 = new Todo("titre1", "Personal", "2024-01-18", 2);
const todo2 = new Todo("titre2", "Personal", "2024-01-20", 1);
const todo3 = new Todo("titre3", "Work", "2024-03-26", 0);
const todo4 = new Todo("titre4", "Sport", "2024-03-27", 2);

storage.wipe();
storage.addTodo(todo1);
storage.addTodo(todo2);
storage.addTodo(todo3);
storage.addTodo(todo4);

console.log("~~~~~~~~~~~~~~~~~");
console.log(storage.getProjectsNames());

console.log(storage.getProjectObj("Personal"));
console.log(storage.getAllTodos());

function desactivateAllButtons() {
    const homeButtons = document.querySelectorAll("ul#home button");
    const projectButtons = document.querySelectorAll("ul#project button");
    const buttons = [...homeButtons, ...projectButtons];
    buttons.forEach((button) => button.classList.remove("active"));
}

function createButton(label, containerQuery, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-link", "link-body-emphasis", "btn", "btn-link");
    button.textContent = label;
    button.addEventListener("click", function () {
        desactivateAllButtons();
        button.classList.add("active");
        callback(label);
    });
    const li = document.createElement("li");
    li.appendChild(button);
    document.querySelector(containerQuery).appendChild(li);
    // button.callback = callback;
}

function displayInbox() {
    const todos = storage.getAllTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayToday() {
    const todos = storage.getTodaysTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayThisWeek() {
    const todos = storage.getThisWeekTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayProject(project) {
    const todos = storage.getProjectObj(project);
    if (!todos) {
        storage.addProject(project);
    }
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function loadProjects() {
    const projectsNames = storage.getProjectsNames();
    projectsNames.forEach((projectName) => {
        createButton(projectName, "ul#project", displayProject);
    });
}

createButton("Inbox", "ul#home", displayInbox);
createButton("Today", "ul#home", displayToday);
createButton("This Week", "ul#home", displayThisWeek);

loadProjects();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2RlZmF1bHRPcHRpb25zLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZUFzYy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VhY2hEYXlPZkludGVydmFsLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZW5kT2ZXZWVrLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBjb21wYXJlQXNjLFxuICAgIGZvcm1hdCxcbiAgICBzdGFydE9mRGF5LFxuICAgIHN0YXJ0T2ZXZWVrLFxuICAgIGVuZE9mV2VlayxcbiAgICBlYWNoRGF5T2ZJbnRlcnZhbCxcbn0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIGdldFByb2plY3RPYmoocHJvamVjdCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHJvamVjdClcbiAgICAgICAgICAgID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0KSlcbiAgICAgICAgICAgIDogW107XG4gICAgfVxuXG4gICAgYWRkVG9kbyhuZXdUb2RvKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPYmogPSB0aGlzLmdldFByb2plY3RPYmoobmV3VG9kby5wcm9qZWN0KTtcblxuICAgICAgICBpZiAocHJvamVjdE9iaikge1xuICAgICAgICAgICAgY29uc3QgdG9kb0V4aXN0cyA9IHByb2plY3RPYmouc29tZShcbiAgICAgICAgICAgICAgICAodG9kbykgPT5cbiAgICAgICAgICAgICAgICAgICAgdG9kby50aXRsZSA9PT0gbmV3VG9kby50aXRsZSAmJlxuICAgICAgICAgICAgICAgICAgICB0b2RvLmR1ZURhdGUgPT09IG5ld1RvZG8uZHVlRGF0ZVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCF0b2RvRXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdE9iai5wdXNoKG5ld1RvZG8pO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgICBuZXdUb2RvLnByb2plY3QsXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByb2plY3RPYmopXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgIGAke25ld1RvZG9DYXJkLnRpdGxlfSB3aXRoICR7bmV3VG9kb0NhcmQuZHVlRGF0ZX0gYWxyZWFkeSBleGlzdHNgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5ld1RvZG8ucHJvamVjdCwgSlNPTi5zdHJpbmdpZnkoW25ld1RvZG9dKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJvamVjdCwgSlNPTi5zdHJpbmdpZnkoW10pKTtcbiAgICB9XG5cbiAgICBkZWxldGVUb2RvKHRvZG9Ub0RlbGV0ZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0c05hbWVzID0gdGhpcy5nZXRQcm9qZWN0c05hbWVzKCk7XG4gICAgICAgIHByb2plY3RzTmFtZXMuZm9yRWFjaCgocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RPYmogPSB0aGlzLmdldFByb2plY3RPYmoocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgdG9kb0luZGV4ID0gcHJvamVjdE9iai5maW5kSW5kZXgoKHRvZG8pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hcmVUb2Rvc0VxdWFsKHRvZG8sIHRvZG9Ub0RlbGV0ZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0b2RvSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdE9iai5zcGxpY2UodG9kb0luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0TmFtZSwgSlNPTi5zdHJpbmdpZnkocHJvamVjdE9iaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZGlzcGxheSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coeyBsb2NhbFN0b3JhZ2UgfSk7XG4gICAgfVxuXG4gICAgd2lwZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdHNOYW1lcygpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBsb2NhbFN0b3JhZ2Uua2V5KGkpO1xuICAgICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgZ2V0QWxsVG9kb3MoKSB7XG4gICAgICAgIGxldCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICBjb25zdCBwcm9qZWN0c05hbWVzID0gdGhpcy5nZXRQcm9qZWN0c05hbWVzKCk7XG4gICAgICAgIHByb2plY3RzTmFtZXMuZm9yRWFjaCgocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RPYmogPSB0aGlzLmdldFByb2plY3RPYmoocHJvamVjdE5hbWUpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdE9iaikge1xuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gICAgfVxuXG4gICAgZ2V0VG9kYXlzVG9kb3MoKSB7XG4gICAgICAgIGNvbnN0IGFsbFRvZG9zID0gdGhpcy5nZXRBbGxUb2RvcygpO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG4gICAgICAgIGNvbnN0IHRvZGF5c1RvZG9zID0gYWxsVG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbXBhcmVBc2Moc3RhcnRPZkRheShuZXcgRGF0ZSh0b2RvLmR1ZURhdGUpKSwgY3VycmVudERhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvZGF5c1RvZG9zO1xuICAgIH1cblxuICAgIGdldFRoaXNXZWVrVG9kb3MoKSB7XG4gICAgICAgIGNvbnN0IGFsbFRvZG9zID0gdGhpcy5nZXRBbGxUb2RvcygpO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG4gICAgICAgIGNvbnN0IGRheXNPZldlZWsgPSBlYWNoRGF5T2ZJbnRlcnZhbCh7XG4gICAgICAgICAgICBzdGFydDogc3RhcnRPZldlZWsoY3VycmVudERhdGUpLFxuICAgICAgICAgICAgZW5kOiBlbmRPZldlZWsoY3VycmVudERhdGUpLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGhpc1dlZWtUb2RvcyA9IGFsbFRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9kb0RhdGUgPSBzdGFydE9mRGF5KG5ldyBEYXRlKHRvZG8uZHVlRGF0ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIGRheXNPZldlZWsuc29tZSgoZGF5KSA9PiArZGF5ID09PSArdG9kb0RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXNXZWVrVG9kb3M7XG4gICAgfVxuXG4gICAgYXJlVG9kb3NFcXVhbCh0b2RvMSwgdG9kbzIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRvZG8xLnRpdGxlID09PSB0b2RvMi50aXRsZSAmJlxuICAgICAgICAgICAgdG9kbzEuZGVzY3JpcHRpb24gPT09IHRvZG8yLmRlc2NyaXB0aW9uICYmXG4gICAgICAgICAgICB0b2RvMS5kdWVEYXRlID09PSB0b2RvMi5kdWVEYXRlICYmXG4gICAgICAgICAgICB0b2RvMS5wcmlvcml0eSA9PT0gdG9kbzIucHJpb3JpdHkgJiZcbiAgICAgICAgICAgIHRvZG8xLm5vdGVzID09PSB0b2RvMi5ub3Rlc1xuICAgICAgICApO1xuICAgIH1cbn1cbiIsImxldCBkZWZhdWx0T3B0aW9ucyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSBuZXdPcHRpb25zO1xufVxuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGNvbXBhcmVBc2NcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICpcbiAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlQXNjKGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3QgX2RhdGVMZWZ0ID0gdG9EYXRlKGRhdGVMZWZ0KTtcbiAgY29uc3QgX2RhdGVSaWdodCA9IHRvRGF0ZShkYXRlUmlnaHQpO1xuXG4gIGNvbnN0IGRpZmYgPSBfZGF0ZUxlZnQuZ2V0VGltZSgpIC0gX2RhdGVSaWdodC5nZXRUaW1lKCk7XG5cbiAgaWYgKGRpZmYgPCAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgcmV0dXJuIDE7XG4gICAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBjb21wYXJlQXNjO1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZWFjaERheU9mSW50ZXJ2YWx9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBlYWNoRGF5T2ZJbnRlcnZhbFxuICogQGNhdGVnb3J5IEludGVydmFsIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgYXJyYXkgb2YgZGF0ZXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZSBpbnRlcnZhbC5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgYXJyYXkgb2YgZGF0ZXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgdGltZSBpbnRlcnZhbC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gaW50ZXJ2YWwgLSBUaGUgaW50ZXJ2YWwuXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIGFycmF5IHdpdGggc3RhcnRzIG9mIGRheXMgZnJvbSB0aGUgZGF5IG9mIHRoZSBpbnRlcnZhbCBzdGFydCB0byB0aGUgZGF5IG9mIHRoZSBpbnRlcnZhbCBlbmRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRWFjaCBkYXkgYmV0d2VlbiA2IE9jdG9iZXIgMjAxNCBhbmQgMTAgT2N0b2JlciAyMDE0OlxuICogY29uc3QgcmVzdWx0ID0gZWFjaERheU9mSW50ZXJ2YWwoe1xuICogICBzdGFydDogbmV3IERhdGUoMjAxNCwgOSwgNiksXG4gKiAgIGVuZDogbmV3IERhdGUoMjAxNCwgOSwgMTApXG4gKiB9KVxuICogLy89PiBbXG4gKiAvLyAgIE1vbiBPY3QgMDYgMjAxNCAwMDowMDowMCxcbiAqIC8vICAgVHVlIE9jdCAwNyAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBXZWQgT2N0IDA4IDIwMTQgMDA6MDA6MDAsXG4gKiAvLyAgIFRodSBPY3QgMDkgMjAxNCAwMDowMDowMCxcbiAqIC8vICAgRnJpIE9jdCAxMCAyMDE0IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWNoRGF5T2ZJbnRlcnZhbChpbnRlcnZhbCwgb3B0aW9ucykge1xuICBjb25zdCBzdGFydERhdGUgPSB0b0RhdGUoaW50ZXJ2YWwuc3RhcnQpO1xuICBjb25zdCBlbmREYXRlID0gdG9EYXRlKGludGVydmFsLmVuZCk7XG5cbiAgbGV0IHJldmVyc2VkID0gK3N0YXJ0RGF0ZSA+ICtlbmREYXRlO1xuICBjb25zdCBlbmRUaW1lID0gcmV2ZXJzZWQgPyArc3RhcnREYXRlIDogK2VuZERhdGU7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gcmV2ZXJzZWQgPyBlbmREYXRlIDogc3RhcnREYXRlO1xuICBjdXJyZW50RGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICBsZXQgc3RlcCA9IG9wdGlvbnM/LnN0ZXAgPz8gMTtcbiAgaWYgKCFzdGVwKSByZXR1cm4gW107XG4gIGlmIChzdGVwIDwgMCkge1xuICAgIHN0ZXAgPSAtc3RlcDtcbiAgICByZXZlcnNlZCA9ICFyZXZlcnNlZDtcbiAgfVxuXG4gIGNvbnN0IGRhdGVzID0gW107XG5cbiAgd2hpbGUgKCtjdXJyZW50RGF0ZSA8PSBlbmRUaW1lKSB7XG4gICAgZGF0ZXMucHVzaCh0b0RhdGUoY3VycmVudERhdGUpKTtcbiAgICBjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIHN0ZXApO1xuICAgIGN1cnJlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB9XG5cbiAgcmV0dXJuIHJldmVyc2VkID8gZGF0ZXMucmV2ZXJzZSgpIDogZGF0ZXM7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZWFjaERheU9mSW50ZXJ2YWw7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBlbmRPZldlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBlbmRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGVuZCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZW5kIG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgZW5kIG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTYXQgU2VwIDA2IDIwMTQgMjM6NTk6NTkuOTk5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBlbmQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBlbmRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gU3VuIFNlcCAwNyAyMDE0IDIzOjU5OjU5Ljk5OVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kT2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyAtNyA6IDApICsgNiAtIChkYXkgLSB3ZWVrU3RhcnRzT24pO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpICsgZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDIzLCA1OSwgNTksIDk5OSk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlbmRPZldlZWs7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIHN0YXJ0T2ZXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBzdGFydCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHsgd2Vla1N0YXJ0c09uOiAxIH0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZldlZWsoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IHdlZWtTdGFydHNPbiA9XG4gICAgb3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIDA7XG5cbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRheSA9IF9kYXRlLmdldERheSgpO1xuICBjb25zdCBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcblxuICBfZGF0ZS5zZXREYXRlKF9kYXRlLmdldERhdGUoKSAtIGRpZmYpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrO1xuIiwiLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICBjb25zdCBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChcbiAgICBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIGFyZ3VtZW50ID09PSBcIm9iamVjdFwiICYmIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgYXJndW1lbnQuY29uc3RydWN0b3IoK2FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwibnVtYmVyXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgfHxcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwic3RyaW5nXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBTdHJpbmddXCJcbiAgKSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHRvRGF0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9tb2R1bGVzL3N0b3JhZ2VcIjtcblxuY2xhc3MgVG9kbyB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLFxuICAgICAgICAgICAgKHRoaXMucHJvamVjdCA9IHByb2plY3QpLFxuICAgICAgICAgICAgKHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGUpLFxuICAgICAgICAgICAgKHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eSk7XG4gICAgfVxufVxuXG5jb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdiNtYWluXCIpO1xuXG5mdW5jdGlvbiBhcHBlbmRUb2RvVG9ET00odG9kbykge1xuICAgIGNvbnNvbGUubG9nKFwiQ291Y291XCIpO1xuICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvRWxlbWVudC5jbGFzc0xpc3QgPVxuICAgICAgICBcImFsZXJ0IGFsZXJ0LXNlY29uZGFyeSBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3cgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI7XG5cbiAgICBjb25zdCBsZWZ0UGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGVmdFBhcnQuY2xhc3NMaXN0ID0gXCJkLWZsZXggZ2FwLTJcIjtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LmlkID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdCA9IFwiZm9ybS1jaGVjay1pbnB1dFwiO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRpdGxlLmlkID0gdGl0bGU7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gdG9kby50aXRsZTtcblxuICAgIGxlZnRQYXJ0LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0UGFydC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBjb25zdCB0aW1lUmVtYWluaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aW1lUmVtYWluaW5nLmlkID0gXCJyZW1haW5pbmdcIjtcbiAgICB0aW1lUmVtYWluaW5nLmlubmVySFRNTCA9IHRvZG8uZHVlRGF0ZTtcblxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjbG9zZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0bi1jbG9zZVwiO1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYnMtZGlzbWlzc1wiLCBcImFsZXJ0XCIpO1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDbG9zZVwiKTtcblxuICAgIHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnRQYXJ0KTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZCh0aW1lUmVtYWluaW5nKTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbiAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZG9FbGVtZW50KTtcbn1cblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5cbmNvbnN0IHRvZG8xID0gbmV3IFRvZG8oXCJ0aXRyZTFcIiwgXCJQZXJzb25hbFwiLCBcIjIwMjQtMDEtMThcIiwgMik7XG5jb25zdCB0b2RvMiA9IG5ldyBUb2RvKFwidGl0cmUyXCIsIFwiUGVyc29uYWxcIiwgXCIyMDI0LTAxLTIwXCIsIDEpO1xuY29uc3QgdG9kbzMgPSBuZXcgVG9kbyhcInRpdHJlM1wiLCBcIldvcmtcIiwgXCIyMDI0LTAzLTI2XCIsIDApO1xuY29uc3QgdG9kbzQgPSBuZXcgVG9kbyhcInRpdHJlNFwiLCBcIlNwb3J0XCIsIFwiMjAyNC0wMy0yN1wiLCAyKTtcblxuc3RvcmFnZS53aXBlKCk7XG5zdG9yYWdlLmFkZFRvZG8odG9kbzEpO1xuc3RvcmFnZS5hZGRUb2RvKHRvZG8yKTtcbnN0b3JhZ2UuYWRkVG9kbyh0b2RvMyk7XG5zdG9yYWdlLmFkZFRvZG8odG9kbzQpO1xuXG5jb25zb2xlLmxvZyhcIn5+fn5+fn5+fn5+fn5+fn5+XCIpO1xuY29uc29sZS5sb2coc3RvcmFnZS5nZXRQcm9qZWN0c05hbWVzKCkpO1xuXG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldFByb2plY3RPYmooXCJQZXJzb25hbFwiKSk7XG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldEFsbFRvZG9zKCkpO1xuXG5mdW5jdGlvbiBkZXNhY3RpdmF0ZUFsbEJ1dHRvbnMoKSB7XG4gICAgY29uc3QgaG9tZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWwjaG9tZSBidXR0b25cIik7XG4gICAgY29uc3QgcHJvamVjdEJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWwjcHJvamVjdCBidXR0b25cIik7XG4gICAgY29uc3QgYnV0dG9ucyA9IFsuLi5ob21lQnV0dG9ucywgLi4ucHJvamVjdEJ1dHRvbnNdO1xuICAgIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihsYWJlbCwgY29udGFpbmVyUXVlcnksIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJuYXYtbGlua1wiLCBcImxpbmstYm9keS1lbXBoYXNpc1wiLCBcImJ0blwiLCBcImJ0bi1saW5rXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXNhY3RpdmF0ZUFsbEJ1dHRvbnMoKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIGNhbGxiYWNrKGxhYmVsKTtcbiAgICB9KTtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyUXVlcnkpLmFwcGVuZENoaWxkKGxpKTtcbiAgICAvLyBidXR0b24uY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gZGlzcGxheUluYm94KCkge1xuICAgIGNvbnN0IHRvZG9zID0gc3RvcmFnZS5nZXRBbGxUb2RvcygpO1xuICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGFwcGVuZFRvZG9Ub0RPTSh0b2RvKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRvZGF5KCkge1xuICAgIGNvbnN0IHRvZG9zID0gc3RvcmFnZS5nZXRUb2RheXNUb2RvcygpO1xuICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGFwcGVuZFRvZG9Ub0RPTSh0b2RvKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRoaXNXZWVrKCkge1xuICAgIGNvbnN0IHRvZG9zID0gc3RvcmFnZS5nZXRUaGlzV2Vla1RvZG9zKCk7XG4gICAgdG9kb0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRvZG9zLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgYXBwZW5kVG9kb1RvRE9NKHRvZG8pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChwcm9qZWN0KSB7XG4gICAgY29uc3QgdG9kb3MgPSBzdG9yYWdlLmdldFByb2plY3RPYmoocHJvamVjdCk7XG4gICAgaWYgKCF0b2Rvcykge1xuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgfVxuICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGFwcGVuZFRvZG9Ub0RPTSh0b2RvKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzTmFtZXMgPSBzdG9yYWdlLmdldFByb2plY3RzTmFtZXMoKTtcbiAgICBwcm9qZWN0c05hbWVzLmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGNyZWF0ZUJ1dHRvbihwcm9qZWN0TmFtZSwgXCJ1bCNwcm9qZWN0XCIsIGRpc3BsYXlQcm9qZWN0KTtcbiAgICB9KTtcbn1cblxuY3JlYXRlQnV0dG9uKFwiSW5ib3hcIiwgXCJ1bCNob21lXCIsIGRpc3BsYXlJbmJveCk7XG5jcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInVsI2hvbWVcIiwgZGlzcGxheVRvZGF5KTtcbmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInVsI2hvbWVcIiwgZGlzcGxheVRoaXNXZWVrKTtcblxubG9hZFByb2plY3RzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=