/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/elements.js":
/*!*********************************!*\
  !*** ./src/modules/elements.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAddTodoButton: () => (/* binding */ createAddTodoButton),
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   createTodoElement: () => (/* binding */ createTodoElement)
/* harmony export */ });
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
}

function createAddTodoButton() {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-center";

    const button = document.createElement("button");
    button.className = "btn btn-primary rounded-circle p-3 lh-1";
    button.type = "button";

    const icon = document.createElement("i");
    icon.className = "bi bi-plus";
    icon.style.fontSize = "24px";

    const span = document.createElement("span");
    span.className = "visually-hidden";
    span.textContent = "Dismiss";

    button.appendChild(icon);
    button.appendChild(span);

    div.appendChild(button);

    return div;
}

function createTodoElement(todo) {
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

    return todoElement;
}

function desactivateAllButtons() {
    const homeButtons = document.querySelectorAll("ul#home button");
    const projectButtons = document.querySelectorAll("ul#project button");
    const buttons = [...homeButtons, ...projectButtons];
    buttons.forEach((button) => button.classList.remove("active"));
}

/***/ }),

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
/* harmony import */ var _modules_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/elements.js */ "./src/modules/elements.js");




class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title),
            (this.project = project),
            (this.dueDate = dueDate),
            (this.priority = priority);
    }
}

const todoContainer = document.querySelector("div#main");

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

function displayInbox() {
    const todos = storage.getAllTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createTodoElement(todo));
    });
}

function displayToday() {
    const todos = storage.getTodaysTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createTodoElement(todo));
    });
}

function displayThisWeek() {
    const todos = storage.getThisWeekTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createTodoElement(todo));
    });
}

function displayProject(project) {
    const todos = storage.getProjectObj(project);
    if (!todos) {
        storage.addProject(project);
    }
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createTodoElement(todo));
    });
}

function loadProjects() {
    const projectsNames = storage.getProjectsNames();
    projectsNames.forEach((projectName) => {
        _modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createButton(projectName, "ul#project", displayProject);
    });
}

_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createButton("Inbox", "ul#home", displayInbox);
_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createButton("Today", "ul#home", displayToday);
_modules_elements_js__WEBPACK_IMPORTED_MODULE_1__.createButton("This Week", "ul#home", displayThisWeek);

loadProjects();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFa0I7O0FBRUg7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLHVCQUF1QixtQkFBbUIsT0FBTyxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixvREFBVTtBQUN0QztBQUNBLG9CQUFvQixvREFBVSxDQUFDLG9EQUFVO0FBQ3pDLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsb0RBQVU7QUFDdEMsMkJBQTJCLDJEQUFpQjtBQUM1QyxtQkFBbUIscURBQVc7QUFDOUIsaUJBQWlCLG1EQUFTO0FBQzFCLFNBQVM7QUFDVDtBQUNBLDZCQUE2QixvREFBVTtBQUN2QztBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0hBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUnNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asb0JBQW9CLG1EQUFNO0FBQzFCLHFCQUFxQixtREFBTTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLDhCQUE4QjtBQUM5QixJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEWTs7QUFFdEM7QUFDQSxRQUFRLHlCQUF5QjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLG9CQUFvQixtREFBTTtBQUMxQixrQkFBa0IsbURBQU07O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsbURBQU07QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxpQkFBaUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RLO0FBQ3dCOztBQUU5RDtBQUNBLFFBQVEsaUJBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsaUJBQWlCO0FBQ2hGO0FBQ0E7QUFDTztBQUNQLHlCQUF5QiwwRUFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtREFBTTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsZ0JBQWdCLG1EQUFNO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JZO0FBQ3dCOztBQUU5RDtBQUNBLFFBQVEsbUJBQW1CO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsaUJBQWlCO0FBQ2xGO0FBQ0E7QUFDTztBQUNQLHlCQUF5QiwwRUFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtREFBTTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEQzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ3pEdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDTjtBQUNVOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQix3REFBTzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbUVBQTBCO0FBQzVELEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtRUFBMEI7QUFDNUQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG1FQUEwQjtBQUM1RCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbUVBQTBCO0FBQzVELEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDhEQUFxQjtBQUM3QixLQUFLO0FBQ0w7O0FBRUEsOERBQXFCO0FBQ3JCLDhEQUFxQjtBQUNyQiw4REFBcUI7O0FBRXJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbXBhcmVBc2MubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lYWNoRGF5T2ZJbnRlcnZhbC5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VuZE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZEYXkubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdXR0b24obGFiZWwsIGNvbnRhaW5lclF1ZXJ5LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwibmF2LWxpbmtcIiwgXCJsaW5rLWJvZHktZW1waGFzaXNcIiwgXCJidG5cIiwgXCJidG4tbGlua1wiKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVzYWN0aXZhdGVBbGxCdXR0b25zKCk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICBjYWxsYmFjayhsYWJlbCk7XG4gICAgfSk7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbGkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclF1ZXJ5KS5hcHBlbmRDaGlsZChsaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGRUb2RvQnV0dG9uKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIjtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1wcmltYXJ5IHJvdW5kZWQtY2lyY2xlIHAtMyBsaC0xXCI7XG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIGljb24uY2xhc3NOYW1lID0gXCJiaSBiaS1wbHVzXCI7XG4gICAgaWNvbi5zdHlsZS5mb250U2l6ZSA9IFwiMjRweFwiO1xuXG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHNwYW4uY2xhc3NOYW1lID0gXCJ2aXN1YWxseS1oaWRkZW5cIjtcbiAgICBzcGFuLnRleHRDb250ZW50ID0gXCJEaXNtaXNzXCI7XG5cbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgICByZXR1cm4gZGl2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVG9kb0VsZW1lbnQodG9kbykge1xuICAgIGNvbnNvbGUubG9nKFwiQ291Y291XCIpO1xuICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0b2RvRWxlbWVudC5jbGFzc0xpc3QgPVxuICAgICAgICBcImFsZXJ0IGFsZXJ0LXNlY29uZGFyeSBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3cgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI7XG5cbiAgICBjb25zdCBsZWZ0UGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbGVmdFBhcnQuY2xhc3NMaXN0ID0gXCJkLWZsZXggZ2FwLTJcIjtcblxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LmlkID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94LmNsYXNzTGlzdCA9IFwiZm9ybS1jaGVjay1pbnB1dFwiO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRpdGxlLmlkID0gdGl0bGU7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gdG9kby50aXRsZTtcblxuICAgIGxlZnRQYXJ0LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBsZWZ0UGFydC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBjb25zdCB0aW1lUmVtYWluaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aW1lUmVtYWluaW5nLmlkID0gXCJyZW1haW5pbmdcIjtcbiAgICB0aW1lUmVtYWluaW5nLmlubmVySFRNTCA9IHRvZG8uZHVlRGF0ZTtcblxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjbG9zZUJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0bi1jbG9zZVwiO1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYnMtZGlzbWlzc1wiLCBcImFsZXJ0XCIpO1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgXCJDbG9zZVwiKTtcblxuICAgIHRvZG9FbGVtZW50LmFwcGVuZENoaWxkKGxlZnRQYXJ0KTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZCh0aW1lUmVtYWluaW5nKTtcbiAgICB0b2RvRWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbiAgICByZXR1cm4gdG9kb0VsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGRlc2FjdGl2YXRlQWxsQnV0dG9ucygpIHtcbiAgICBjb25zdCBob21lQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bCNob21lIGJ1dHRvblwiKTtcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ1bCNwcm9qZWN0IGJ1dHRvblwiKTtcbiAgICBjb25zdCBidXR0b25zID0gWy4uLmhvbWVCdXR0b25zLCAuLi5wcm9qZWN0QnV0dG9uc107XG4gICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbn0iLCJpbXBvcnQge1xuICAgIGNvbXBhcmVBc2MsXG4gICAgZm9ybWF0LFxuICAgIHN0YXJ0T2ZEYXksXG4gICAgc3RhcnRPZldlZWssXG4gICAgZW5kT2ZXZWVrLFxuICAgIGVhY2hEYXlPZkludGVydmFsLFxufSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gICAgZ2V0UHJvamVjdE9iaihwcm9qZWN0KSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0KVxuICAgICAgICAgICAgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb2plY3QpKVxuICAgICAgICAgICAgOiBbXTtcbiAgICB9XG5cbiAgICBhZGRUb2RvKG5ld1RvZG8pIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IHRoaXMuZ2V0UHJvamVjdE9iaihuZXdUb2RvLnByb2plY3QpO1xuXG4gICAgICAgIGlmIChwcm9qZWN0T2JqKSB7XG4gICAgICAgICAgICBjb25zdCB0b2RvRXhpc3RzID0gcHJvamVjdE9iai5zb21lKFxuICAgICAgICAgICAgICAgICh0b2RvKSA9PlxuICAgICAgICAgICAgICAgICAgICB0b2RvLnRpdGxlID09PSBuZXdUb2RvLnRpdGxlICYmXG4gICAgICAgICAgICAgICAgICAgIHRvZG8uZHVlRGF0ZSA9PT0gbmV3VG9kby5kdWVEYXRlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIXRvZG9FeGlzdHMpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0T2JqLnB1c2gobmV3VG9kbyk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIG5ld1RvZG8ucHJvamVjdCxcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocHJvamVjdE9iailcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcbiAgICAgICAgICAgICAgICAgICAgYCR7bmV3VG9kb0NhcmQudGl0bGV9IHdpdGggJHtuZXdUb2RvQ2FyZC5kdWVEYXRlfSBhbHJlYWR5IGV4aXN0c2BcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmV3VG9kby5wcm9qZWN0LCBKU09OLnN0cmluZ2lmeShbbmV3VG9kb10pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0LCBKU09OLnN0cmluZ2lmeShbXSkpO1xuICAgIH1cblxuICAgIGRlbGV0ZVRvZG8odG9kb1RvRGVsZXRlKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RzTmFtZXMgPSB0aGlzLmdldFByb2plY3RzTmFtZXMoKTtcbiAgICAgICAgcHJvamVjdHNOYW1lcy5mb3JFYWNoKChwcm9qZWN0TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IHRoaXMuZ2V0UHJvamVjdE9iaihwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBjb25zdCB0b2RvSW5kZXggPSBwcm9qZWN0T2JqLmZpbmRJbmRleCgodG9kbykgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmFyZVRvZG9zRXF1YWwodG9kbywgdG9kb1RvRGVsZXRlKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHRvZG9JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0T2JqLnNwbGljZSh0b2RvSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3ROYW1lLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0T2JqKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh7IGxvY2FsU3RvcmFnZSB9KTtcbiAgICB9XG5cbiAgICB3aXBlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0c05hbWVzKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcbiAgICB9XG5cbiAgICBnZXRBbGxUb2RvcygpIHtcbiAgICAgICAgbGV0IGFsbFByb2plY3RzID0gW107XG4gICAgICAgIGNvbnN0IHByb2plY3RzTmFtZXMgPSB0aGlzLmdldFByb2plY3RzTmFtZXMoKTtcbiAgICAgICAgcHJvamVjdHNOYW1lcy5mb3JFYWNoKChwcm9qZWN0TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdE9iaiA9IHRoaXMuZ2V0UHJvamVjdE9iaihwcm9qZWN0TmFtZSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0T2JqKSB7XG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhbGxQcm9qZWN0cztcbiAgICB9XG5cbiAgICBnZXRUb2RheXNUb2RvcygpIHtcbiAgICAgICAgY29uc3QgYWxsVG9kb3MgPSB0aGlzLmdldEFsbFRvZG9zKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgICAgY29uc3QgdG9kYXlzVG9kb3MgPSBhbGxUb2Rvcy5maWx0ZXIoKHRvZG8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhY29tcGFyZUFzYyhzdGFydE9mRGF5KG5ldyBEYXRlKHRvZG8uZHVlRGF0ZSkpLCBjdXJyZW50RGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdG9kYXlzVG9kb3M7XG4gICAgfVxuXG4gICAgZ2V0VGhpc1dlZWtUb2RvcygpIHtcbiAgICAgICAgY29uc3QgYWxsVG9kb3MgPSB0aGlzLmdldEFsbFRvZG9zKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcbiAgICAgICAgY29uc3QgZGF5c09mV2VlayA9IGVhY2hEYXlPZkludGVydmFsKHtcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydE9mV2VlayhjdXJyZW50RGF0ZSksXG4gICAgICAgICAgICBlbmQ6IGVuZE9mV2VlayhjdXJyZW50RGF0ZSksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0aGlzV2Vla1RvZG9zID0gYWxsVG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2RvRGF0ZSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUodG9kby5kdWVEYXRlKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF5c09mV2Vlay5zb21lKChkYXkpID0+ICtkYXkgPT09ICt0b2RvRGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpc1dlZWtUb2RvcztcbiAgICB9XG5cbiAgICBhcmVUb2Rvc0VxdWFsKHRvZG8xLCB0b2RvMikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdG9kbzEudGl0bGUgPT09IHRvZG8yLnRpdGxlICYmXG4gICAgICAgICAgICB0b2RvMS5kZXNjcmlwdGlvbiA9PT0gdG9kbzIuZGVzY3JpcHRpb24gJiZcbiAgICAgICAgICAgIHRvZG8xLmR1ZURhdGUgPT09IHRvZG8yLmR1ZURhdGUgJiZcbiAgICAgICAgICAgIHRvZG8xLnByaW9yaXR5ID09PSB0b2RvMi5wcmlvcml0eSAmJlxuICAgICAgICAgICAgdG9kbzEubm90ZXMgPT09IHRvZG8yLm5vdGVzXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgY29tcGFyZUFzY1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAtMSwgMCBvciAxLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxuICogLTEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgb3IgMCBpZiBkYXRlcyBhcmUgZXF1YWwuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGVMZWZ0IC0gVGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIGRhdGVSaWdodCAtIFRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKlxuICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbXBhcmVBc2MobmV3IERhdGUoMTk4NywgMSwgMTEpLCBuZXcgRGF0ZSgxOTg5LCA2LCAxMCkpXG4gKiAvLz0+IC0xXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNvcnQgdGhlIGFycmF5IG9mIGRhdGVzOlxuICogY29uc3QgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICBjb25zdCBfZGF0ZUxlZnQgPSB0b0RhdGUoZGF0ZUxlZnQpO1xuICBjb25zdCBfZGF0ZVJpZ2h0ID0gdG9EYXRlKGRhdGVSaWdodCk7XG5cbiAgY29uc3QgZGlmZiA9IF9kYXRlTGVmdC5nZXRUaW1lKCkgLSBfZGF0ZVJpZ2h0LmdldFRpbWUoKTtcblxuICBpZiAoZGlmZiA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICByZXR1cm4gMTtcbiAgICAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGNvbXBhcmVBc2M7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBlYWNoRGF5T2ZJbnRlcnZhbH0gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGVhY2hEYXlPZkludGVydmFsXG4gKiBAY2F0ZWdvcnkgSW50ZXJ2YWwgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBhcnJheSBvZiBkYXRlcyB3aXRoaW4gdGhlIHNwZWNpZmllZCB0aW1lIGludGVydmFsLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBhcnJheSBvZiBkYXRlcyB3aXRoaW4gdGhlIHNwZWNpZmllZCB0aW1lIGludGVydmFsLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBpbnRlcnZhbCAtIFRoZSBpbnRlcnZhbC5cbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqXG4gKiBAcmV0dXJucyBUaGUgYXJyYXkgd2l0aCBzdGFydHMgb2YgZGF5cyBmcm9tIHRoZSBkYXkgb2YgdGhlIGludGVydmFsIHN0YXJ0IHRvIHRoZSBkYXkgb2YgdGhlIGludGVydmFsIGVuZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBFYWNoIGRheSBiZXR3ZWVuIDYgT2N0b2JlciAyMDE0IGFuZCAxMCBPY3RvYmVyIDIwMTQ6XG4gKiBjb25zdCByZXN1bHQgPSBlYWNoRGF5T2ZJbnRlcnZhbCh7XG4gKiAgIHN0YXJ0OiBuZXcgRGF0ZSgyMDE0LCA5LCA2KSxcbiAqICAgZW5kOiBuZXcgRGF0ZSgyMDE0LCA5LCAxMClcbiAqIH0pXG4gKiAvLz0+IFtcbiAqIC8vICAgTW9uIE9jdCAwNiAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBUdWUgT2N0IDA3IDIwMTQgMDA6MDA6MDAsXG4gKiAvLyAgIFdlZCBPY3QgMDggMjAxNCAwMDowMDowMCxcbiAqIC8vICAgVGh1IE9jdCAwOSAyMDE0IDAwOjAwOjAwLFxuICogLy8gICBGcmkgT2N0IDEwIDIwMTQgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2hEYXlPZkludGVydmFsKGludGVydmFsLCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0YXJ0RGF0ZSA9IHRvRGF0ZShpbnRlcnZhbC5zdGFydCk7XG4gIGNvbnN0IGVuZERhdGUgPSB0b0RhdGUoaW50ZXJ2YWwuZW5kKTtcblxuICBsZXQgcmV2ZXJzZWQgPSArc3RhcnREYXRlID4gK2VuZERhdGU7XG4gIGNvbnN0IGVuZFRpbWUgPSByZXZlcnNlZCA/ICtzdGFydERhdGUgOiArZW5kRGF0ZTtcbiAgY29uc3QgY3VycmVudERhdGUgPSByZXZlcnNlZCA/IGVuZERhdGUgOiBzdGFydERhdGU7XG4gIGN1cnJlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gIGxldCBzdGVwID0gb3B0aW9ucz8uc3RlcCA/PyAxO1xuICBpZiAoIXN0ZXApIHJldHVybiBbXTtcbiAgaWYgKHN0ZXAgPCAwKSB7XG4gICAgc3RlcCA9IC1zdGVwO1xuICAgIHJldmVyc2VkID0gIXJldmVyc2VkO1xuICB9XG5cbiAgY29uc3QgZGF0ZXMgPSBbXTtcblxuICB3aGlsZSAoK2N1cnJlbnREYXRlIDw9IGVuZFRpbWUpIHtcbiAgICBkYXRlcy5wdXNoKHRvRGF0ZShjdXJyZW50RGF0ZSkpO1xuICAgIGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgc3RlcCk7XG4gICAgY3VycmVudERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIH1cblxuICByZXR1cm4gcmV2ZXJzZWQgPyBkYXRlcy5yZXZlcnNlKCkgOiBkYXRlcztcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlYWNoRGF5T2ZJbnRlcnZhbDtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGVuZE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIGVuZE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBlbmQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZW5kIG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBlbmQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBlbmQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gZW5kT2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFNhdCBTZXAgMDYgMjAxNCAyMzo1OTo1OS45OTlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIGVuZCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IGVuZE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBTdW4gU2VwIDA3IDIwMTQgMjM6NTk6NTkuOTk5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmRPZldlZWsoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IHdlZWtTdGFydHNPbiA9XG4gICAgb3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIDA7XG5cbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRheSA9IF9kYXRlLmdldERheSgpO1xuICBjb25zdCBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IC03IDogMCkgKyA2IC0gKGRheSAtIHdlZWtTdGFydHNPbik7XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgKyBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMjMsIDU5LCA1OSwgOTk5KTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGVuZE9mV2VlaztcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXkoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mRGF5O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi9fbGliL2RlZmF1bHRPcHRpb25zLm1qc1wiO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgc3RhcnRPZldlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBTdW4gQXVnIDMxIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdGhlIHdlZWsgc3RhcnRzIG9uIE1vbmRheSwgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSwgeyB3ZWVrU3RhcnRzT246IDEgfSlcbiAqIC8vPT4gTW9uIFNlcCAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGF5ID0gX2RhdGUuZ2V0RGF5KCk7XG4gIGNvbnN0IGRpZmYgPSAoZGF5IDwgd2Vla1N0YXJ0c09uID8gNyA6IDApICsgZGF5IC0gd2Vla1N0YXJ0c09uO1xuXG4gIF9kYXRlLnNldERhdGUoX2RhdGUuZ2V0RGF0ZSgpIC0gZGlmZik7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZldlZWs7XG4iLCIvKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIGNvbnN0IGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKFxuICAgIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgYXJndW1lbnQgPT09IFwib2JqZWN0XCIgJiYgYXJnU3RyID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBhcmd1bWVudC5jb25zdHJ1Y3RvcigrYXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJudW1iZXJcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiB8fFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxuICApIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgdG9EYXRlO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb21wYXJlQXNjLCBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL21vZHVsZXMvc3RvcmFnZVwiO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi9tb2R1bGVzL2VsZW1lbnRzLmpzJztcblxuY2xhc3MgVG9kbyB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLFxuICAgICAgICAgICAgKHRoaXMucHJvamVjdCA9IHByb2plY3QpLFxuICAgICAgICAgICAgKHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGUpLFxuICAgICAgICAgICAgKHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eSk7XG4gICAgfVxufVxuXG5jb25zdCB0b2RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdiNtYWluXCIpO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuY29uc3QgdG9kbzEgPSBuZXcgVG9kbyhcInRpdHJlMVwiLCBcIlBlcnNvbmFsXCIsIFwiMjAyNC0wMS0xOFwiLCAyKTtcbmNvbnN0IHRvZG8yID0gbmV3IFRvZG8oXCJ0aXRyZTJcIiwgXCJQZXJzb25hbFwiLCBcIjIwMjQtMDEtMjBcIiwgMSk7XG5jb25zdCB0b2RvMyA9IG5ldyBUb2RvKFwidGl0cmUzXCIsIFwiV29ya1wiLCBcIjIwMjQtMDMtMjZcIiwgMCk7XG5jb25zdCB0b2RvNCA9IG5ldyBUb2RvKFwidGl0cmU0XCIsIFwiU3BvcnRcIiwgXCIyMDI0LTAzLTI3XCIsIDIpO1xuXG5zdG9yYWdlLndpcGUoKTtcbnN0b3JhZ2UuYWRkVG9kbyh0b2RvMSk7XG5zdG9yYWdlLmFkZFRvZG8odG9kbzIpO1xuc3RvcmFnZS5hZGRUb2RvKHRvZG8zKTtcbnN0b3JhZ2UuYWRkVG9kbyh0b2RvNCk7XG5cbmNvbnNvbGUubG9nKFwifn5+fn5+fn5+fn5+fn5+fn5cIik7XG5jb25zb2xlLmxvZyhzdG9yYWdlLmdldFByb2plY3RzTmFtZXMoKSk7XG5cbmNvbnNvbGUubG9nKHN0b3JhZ2UuZ2V0UHJvamVjdE9iaihcIlBlcnNvbmFsXCIpKTtcbmNvbnNvbGUubG9nKHN0b3JhZ2UuZ2V0QWxsVG9kb3MoKSk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlJbmJveCgpIHtcbiAgICBjb25zdCB0b2RvcyA9IHN0b3JhZ2UuZ2V0QWxsVG9kb3MoKTtcbiAgICB0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnRzLmNyZWF0ZVRvZG9FbGVtZW50KHRvZG8pKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRvZGF5KCkge1xuICAgIGNvbnN0IHRvZG9zID0gc3RvcmFnZS5nZXRUb2RheXNUb2RvcygpO1xuICAgIHRvZG9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0b2Rvcy5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIHRvZG9Db250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudHMuY3JlYXRlVG9kb0VsZW1lbnQodG9kbykpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGhpc1dlZWsoKSB7XG4gICAgY29uc3QgdG9kb3MgPSBzdG9yYWdlLmdldFRoaXNXZWVrVG9kb3MoKTtcbiAgICB0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnRzLmNyZWF0ZVRvZG9FbGVtZW50KHRvZG8pKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IHRvZG9zID0gc3RvcmFnZS5nZXRQcm9qZWN0T2JqKHByb2plY3QpO1xuICAgIGlmICghdG9kb3MpIHtcbiAgICAgICAgc3RvcmFnZS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgIH1cbiAgICB0b2RvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdG9kb3MuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICB0b2RvQ29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnRzLmNyZWF0ZVRvZG9FbGVtZW50KHRvZG8pKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzTmFtZXMgPSBzdG9yYWdlLmdldFByb2plY3RzTmFtZXMoKTtcbiAgICBwcm9qZWN0c05hbWVzLmZvckVhY2goKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGVsZW1lbnRzLmNyZWF0ZUJ1dHRvbihwcm9qZWN0TmFtZSwgXCJ1bCNwcm9qZWN0XCIsIGRpc3BsYXlQcm9qZWN0KTtcbiAgICB9KTtcbn1cblxuZWxlbWVudHMuY3JlYXRlQnV0dG9uKFwiSW5ib3hcIiwgXCJ1bCNob21lXCIsIGRpc3BsYXlJbmJveCk7XG5lbGVtZW50cy5jcmVhdGVCdXR0b24oXCJUb2RheVwiLCBcInVsI2hvbWVcIiwgZGlzcGxheVRvZGF5KTtcbmVsZW1lbnRzLmNyZWF0ZUJ1dHRvbihcIlRoaXMgV2Vla1wiLCBcInVsI2hvbWVcIiwgZGlzcGxheVRoaXNXZWVrKTtcblxubG9hZFByb2plY3RzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=