/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/server.tsx":
/*!***************************!*\
  !*** ./server/server.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const multer_1 = __importDefault(__webpack_require__(/*! multer */ "multer"));
const nodemailer_1 = __importDefault(__webpack_require__(/*! nodemailer */ "nodemailer"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const server_1 = __importDefault(__webpack_require__(/*! react-dom/server */ "react-dom/server"));
const compression_1 = __importDefault(__webpack_require__(/*! compression */ "compression"));
const App_1 = __webpack_require__(/*! ../src/app/App */ "./src/app/App.tsx");
const server_2 = __webpack_require__(/*! react-router-dom/server */ "react-router-dom/server");
// @ts-ignore
const server = (0, express_1.default)();
const upload = (0, multer_1.default)();
server.set('view engine', 'ejs');
server.set('views', path_1.default.join(__dirname, 'views'));
server.use((0, compression_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use('/', express_1.default.static(path_1.default.join(__dirname, 'static')));
const manifest = fs_1.default.readFileSync(path_1.default.join(__dirname, 'static/manifest.json'), 'utf-8');
const assets = JSON.parse(manifest);
// @ts-ignore
server.get('*', (req, res) => {
    const component = server_1.default.renderToString(react_1.default.createElement(server_2.StaticRouter, { location: req.url },
        react_1.default.createElement(App_1.App, null)));
    res.render('client', { assets, component });
});
server.post('/order', upload.single('file'), (req, res) => {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "vlad-astahov04@mail.ru",
            pass: "rmnBbyYgrnFAqRbkPa9j"
        }
    });
    const mailOptions = Object.assign({ from: 'vlad-astahov04@mail.ru', to: 'vlad-astahov04@mail.ru', subject: 'Заявка', html: `
            <html lang="ru">
                <body>
                    ${[
            `<strong>email</strong>: ${req.body.email}`,
            req.body.comment && `<strong>Комментарий</strong>: ${req.body.comment}`
        ].join(`<br/>`)}
                </body>
            </html>
        ` }, (req.file && {
        attachments: [
            {
                filename: req.file.originalname,
                content: req.file.buffer
            }
        ]
    }));
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Ошибка отправки письма');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});
server.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});


/***/ }),

/***/ "./src/app/App.tsx":
/*!*************************!*\
  !*** ./src/app/App.tsx ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "react-router-dom");
const utils_1 = __webpack_require__(/*! ../shared/utils */ "./src/shared/utils/index.ts");
const pages_1 = __webpack_require__(/*! ../pages */ "./src/pages/index.ts");
const WithProviders_1 = __webpack_require__(/*! ./WithProviders */ "./src/app/WithProviders.tsx");
const App = () => (React.createElement(WithProviders_1.WithProviders, null,
    React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { path: utils_1.navigation.Routes.HOME, element: React.createElement(pages_1.Home, null) }),
        React.createElement(react_router_dom_1.Route, { path: utils_1.navigation.Routes.LOGIN, element: React.createElement(pages_1.Login, null) }))));
exports.App = App;


/***/ }),

/***/ "./src/app/WithProviders.tsx":
/*!***********************************!*\
  !*** ./src/app/WithProviders.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithProviders = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const utils_1 = __webpack_require__(/*! ../shared/utils */ "./src/shared/utils/index.ts");
const feature_1 = __webpack_require__(/*! ../feature */ "./src/feature/index.ts");
const modals = [
    {
        name: 'presentation',
        component: React.createElement(feature_1.ModalPresentation, null)
    },
    {
        name: 'success-order',
        component: React.createElement(feature_1.ModalSubmitOrder, null)
    },
    {
        name: 'login-form',
        component: React.createElement(feature_1.LoginFormModal, null)
    }
];
exports.WithProviders = React.memo(({ children }) => (React.createElement(utils_1.providers.modalProvider.ModalProvider, { modals: modals }, children)));


/***/ }),

/***/ "./src/feature/LoginForm/LoginForm.tsx":
/*!*********************************************!*\
  !*** ./src/feature/LoginForm/LoginForm.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginForm = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const model_1 = __webpack_require__(/*! ./model */ "./src/feature/LoginForm/model.ts");
const reflect_1 = __webpack_require__(/*! @effector/reflect */ "@effector/reflect");
const Input_1 = __webpack_require__(/*! ../../shared/ui/Input/Input */ "./src/shared/ui/Input/Input.tsx");
const Button_1 = __webpack_require__(/*! ../../shared/ui/Button/Button */ "./src/shared/ui/Button/Button.tsx");
const utils_1 = __webpack_require__(/*! ../../shared/utils */ "./src/shared/utils/index.ts");
const rootClass = 'login-form';
exports.LoginForm = React.memo(({ classes }) => {
    const { open } = utils_1.providers.modalProvider.useModal();
    model_1.loginFormModel.onValidate.set(() => open('login-form'));
    return React.createElement("div", { className: `${rootClass} ${classes}` },
        React.createElement(EmailInputReflect, null),
        React.createElement(PasswordInputReflect, null),
        React.createElement(ButtonSubmitReflect, null, "\u0412\u043E\u0439\u0442\u0438"));
});
const EmailInputReflect = (0, reflect_1.reflect)({
    view: Input_1.Input,
    bind: {
        value: model_1.loginFormModel.$email,
        onInput: model_1.loginFormModel.emailUpdated,
        isError: model_1.loginFormModel.$isEmailError,
        type: 'email',
        placeholder: 'E-mail',
        classes: `${rootClass}__input`
    }
});
const PasswordInputReflect = (0, reflect_1.reflect)({
    view: Input_1.Input,
    bind: {
        value: model_1.loginFormModel.$password,
        onInput: model_1.loginFormModel.passwordUpdated,
        isError: model_1.loginFormModel.$isPasswordError,
        type: 'password',
        placeholder: 'Пароль',
        classes: `${rootClass}__input`
    }
});
const ButtonSubmitReflect = (0, reflect_1.reflect)({
    view: Button_1.Button,
    bind: {
        onPress: model_1.loginFormModel.dataSubmit,
        classes: `${rootClass}__button`
    }
});


/***/ }),

/***/ "./src/feature/LoginForm/LoginFormModal.tsx":
/*!**************************************************!*\
  !*** ./src/feature/LoginForm/LoginFormModal.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginFormModal = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ui_1 = __webpack_require__(/*! ../../shared/ui */ "./src/shared/ui/index.ts");
const rootClass = 'login-form-modal';
const LoginFormModal = () => {
    return React.createElement(ui_1.Modal, { classes: rootClass },
        React.createElement("h4", null, "\u0412\u0430\u0448 \u043F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0432\u0430\u0448\u0435\u043C\u0443 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443"));
};
exports.LoginFormModal = LoginFormModal;


/***/ }),

/***/ "./src/feature/LoginForm/index.ts":
/*!****************************************!*\
  !*** ./src/feature/LoginForm/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginFormModal = exports.LoginForm = void 0;
var LoginForm_1 = __webpack_require__(/*! ./LoginForm */ "./src/feature/LoginForm/LoginForm.tsx");
Object.defineProperty(exports, "LoginForm", ({ enumerable: true, get: function () { return LoginForm_1.LoginForm; } }));
var LoginFormModal_1 = __webpack_require__(/*! ./LoginFormModal */ "./src/feature/LoginForm/LoginFormModal.tsx");
Object.defineProperty(exports, "LoginFormModal", ({ enumerable: true, get: function () { return LoginFormModal_1.LoginFormModal; } }));


/***/ }),

/***/ "./src/feature/LoginForm/model.ts":
/*!****************************************!*\
  !*** ./src/feature/LoginForm/model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginFormModel = void 0;
const utils_1 = __webpack_require__(/*! ../../shared/utils */ "./src/shared/utils/index.ts");
const effector_1 = __webpack_require__(/*! effector */ "effector");
const patronum_1 = __webpack_require__(/*! patronum */ "patronum");
const onValidate = utils_1.effector.createInstanceStore(() => { });
const emailUpdated = (0, effector_1.createEvent)();
const passwordUpdated = (0, effector_1.createEvent)();
const $email = (0, effector_1.createStore)('')
    .on(emailUpdated, (_, payload) => payload);
const $password = (0, effector_1.createStore)('')
    .on(passwordUpdated, (_, payload) => payload);
const dataSubmit = (0, effector_1.createEvent)();
const $isEmailValidated = (0, effector_1.createStore)(false)
    .on(dataSubmit, () => true);
const $isPasswordValidated = (0, effector_1.createStore)(false)
    .on(dataSubmit, () => true);
const $isEmailEmpty = $email.map(state => !state);
const $isPasswordEmpty = $password.map(state => !state);
const $isEmailError = (0, patronum_1.and)($isEmailEmpty, $isEmailValidated);
const $isPasswordError = (0, patronum_1.and)($isPasswordEmpty, $isPasswordValidated);
const $isValid = (0, patronum_1.and)((0, patronum_1.not)($isEmailError), (0, patronum_1.not)($isPasswordError));
(0, patronum_1.condition)({
    source: dataSubmit,
    if: $isValid,
    then: onValidate.trigger
});
exports.loginFormModel = {
    $email,
    $password,
    passwordUpdated,
    emailUpdated,
    dataSubmit,
    $isEmailError,
    $isPasswordError,
    onValidate,
};


/***/ }),

/***/ "./src/feature/ModalPresentation/ModalPresentation.tsx":
/*!*************************************************************!*\
  !*** ./src/feature/ModalPresentation/ModalPresentation.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalPresentation = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ui_1 = __webpack_require__(/*! ../../shared/ui */ "./src/shared/ui/index.ts");
const Button_1 = __webpack_require__(/*! ../../shared/ui/Button/Button */ "./src/shared/ui/Button/Button.tsx");
const rootClass = 'modal-presentation';
const ModalPresentation = () => {
    return React.createElement(ui_1.Modal, { classes: rootClass },
        React.createElement("h4", null, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043D\u0430\u0448\u0443 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E"),
        React.createElement(Button_1.Button, { tag: 'a', href: './files/test.mov', download: true }, "\u0421\u043A\u0430\u0447\u0430\u0442\u044C"));
};
exports.ModalPresentation = ModalPresentation;


/***/ }),

/***/ "./src/feature/ModalPresentation/index.ts":
/*!************************************************!*\
  !*** ./src/feature/ModalPresentation/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalPresentation = void 0;
var ModalPresentation_1 = __webpack_require__(/*! ./ModalPresentation */ "./src/feature/ModalPresentation/ModalPresentation.tsx");
Object.defineProperty(exports, "ModalPresentation", ({ enumerable: true, get: function () { return ModalPresentation_1.ModalPresentation; } }));


/***/ }),

/***/ "./src/feature/OrderForm/ModalSubmitOrder.tsx":
/*!****************************************************!*\
  !*** ./src/feature/OrderForm/ModalSubmitOrder.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalSubmitOrder = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const react_google_recaptcha_1 = __importDefault(__webpack_require__(/*! react-google-recaptcha */ "react-google-recaptcha"));
const ui_1 = __webpack_require__(/*! ../../shared/ui */ "./src/shared/ui/index.ts");
const react_1 = __webpack_require__(/*! react */ "react");
const reflect_1 = __webpack_require__(/*! @effector/reflect */ "@effector/reflect");
const model_1 = __webpack_require__(/*! ./model */ "./src/feature/OrderForm/model.ts");
const rootClass = 'modal-success-order';
const ModalSubmitOrder = () => {
    const [isCaptchaSuccessful, setIsCaptchaSuccess] = (0, react_1.useState)(false);
    model_1.orderFormModel.onSuccess.set(() => setIsCaptchaSuccess(true));
    return React.createElement(ui_1.Modal, { classes: rootClass }, isCaptchaSuccessful ? (React.createElement("h4", null, "\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430")) : (React.createElement(CaptchaReflect, null)));
};
exports.ModalSubmitOrder = ModalSubmitOrder;
const CaptchaReflect = (0, reflect_1.reflect)({
    view: react_google_recaptcha_1.default,
    bind: {
        sitekey: '6LdKPqspAAAAAH_IPiGcuzuWRAWkuR4cDVytrj5y',
        onChange: model_1.orderFormModel.capchaSubmitted,
    }
});


/***/ }),

/***/ "./src/feature/OrderForm/OrderForm.tsx":
/*!*********************************************!*\
  !*** ./src/feature/OrderForm/OrderForm.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderForm = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const model_1 = __webpack_require__(/*! ./model */ "./src/feature/OrderForm/model.ts");
const reflect_1 = __webpack_require__(/*! @effector/reflect */ "@effector/reflect");
const Input_1 = __webpack_require__(/*! ../../shared/ui/Input/Input */ "./src/shared/ui/Input/Input.tsx");
const Button_1 = __webpack_require__(/*! ../../shared/ui/Button/Button */ "./src/shared/ui/Button/Button.tsx");
const ui_1 = __webpack_require__(/*! ../../shared/ui */ "./src/shared/ui/index.ts");
const utils_1 = __webpack_require__(/*! ../../shared/utils */ "./src/shared/utils/index.ts");
const rootClass = 'order-form';
exports.OrderForm = React.memo(({ classes }) => {
    const { open } = utils_1.providers.modalProvider.useModal();
    model_1.orderFormModel.onValidate.set(() => open('success-order'));
    return React.createElement("div", { className: `${rootClass} ${classes}` },
        React.createElement(InputEmailReflect, null),
        React.createElement(InputFileReflect, null),
        React.createElement(InputCommentReflect, null),
        React.createElement(ButtonReflect, null, "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"),
        React.createElement(CheckboxReflect, null,
            "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 ",
            React.createElement(ui_1.Link, { href: "#" }, "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")));
});
const InputEmailReflect = (0, reflect_1.reflect)({
    view: Input_1.Input,
    bind: {
        value: model_1.orderFormModel.$email,
        onInput: model_1.orderFormModel.emailUpdated,
        isError: model_1.orderFormModel.$isError,
        type: 'email',
        placeholder: 'Ваш E-mail',
        classes: `${rootClass}__input`
    }
});
const InputFileReflect = (0, reflect_1.reflect)({
    view: Input_1.Input,
    bind: {
        // @ts-ignore
        value: model_1.orderFormModel.$file,
        // @ts-ignore
        onInput: model_1.orderFormModel.fileUpdated,
        type: 'file',
        placeholder: 'Прикрепить файл',
        classes: `${rootClass}__input`,
        icon: 'clip',
    }
});
const InputCommentReflect = (0, reflect_1.reflect)({
    view: Input_1.Input,
    bind: {
        value: model_1.orderFormModel.$comment,
        onInput: model_1.orderFormModel.commentUpdated,
        isTextarea: true,
        placeholder: 'Комментарий',
        classes: `${rootClass}__input`
    }
});
const CheckboxReflect = (0, reflect_1.reflect)({
    view: ui_1.Checkbox,
    bind: {
        value: model_1.orderFormModel.$isPrivacy,
        onChange: model_1.orderFormModel.privacyRead,
        classes: `${rootClass}__checkbox`
    }
});
const ButtonReflect = (0, reflect_1.reflect)({
    view: Button_1.Button,
    bind: {
        onPress: model_1.orderFormModel.eventSent,
        isLoading: model_1.orderFormModel.$isLoading,
        isDisabled: model_1.orderFormModel.$isDisabled,
        classes: `${rootClass}__button`
    }
});


/***/ }),

/***/ "./src/feature/OrderForm/api.ts":
/*!**************************************!*\
  !*** ./src/feature/OrderForm/api.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.orderFormApi = void 0;
exports.orderFormApi = {
    send: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const body = new FormData();
        body.append('email', data.email);
        body.append('comment', data.comment);
        if (data.file) {
            body.append('file', data.file);
        }
        yield fetch('/order', {
            method: 'POST',
            body,
        });
    })
};


/***/ }),

/***/ "./src/feature/OrderForm/index.ts":
/*!****************************************!*\
  !*** ./src/feature/OrderForm/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalSubmitOrder = exports.OrderForm = void 0;
var OrderForm_1 = __webpack_require__(/*! ./OrderForm */ "./src/feature/OrderForm/OrderForm.tsx");
Object.defineProperty(exports, "OrderForm", ({ enumerable: true, get: function () { return OrderForm_1.OrderForm; } }));
var ModalSubmitOrder_1 = __webpack_require__(/*! ./ModalSubmitOrder */ "./src/feature/OrderForm/ModalSubmitOrder.tsx");
Object.defineProperty(exports, "ModalSubmitOrder", ({ enumerable: true, get: function () { return ModalSubmitOrder_1.ModalSubmitOrder; } }));


/***/ }),

/***/ "./src/feature/OrderForm/model.ts":
/*!****************************************!*\
  !*** ./src/feature/OrderForm/model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.orderFormModel = void 0;
const api_1 = __webpack_require__(/*! ./api */ "./src/feature/OrderForm/api.ts");
const effector_1 = __webpack_require__(/*! effector */ "effector");
const patronum_1 = __webpack_require__(/*! patronum */ "patronum");
const utils_1 = __webpack_require__(/*! ../../shared/utils */ "./src/shared/utils/index.ts");
const onSuccess = utils_1.effector.createInstanceStore(() => { });
const onValidate = utils_1.effector.createInstanceStore(() => { });
const sendFx = (0, effector_1.createEffect)(api_1.orderFormApi.send);
const emailUpdated = (0, effector_1.createEvent)();
const commentUpdated = (0, effector_1.createEvent)();
const fileUpdated = (0, effector_1.createEvent)();
const privacyRead = (0, effector_1.createEvent)();
const $isPrivacy = (0, effector_1.createStore)(false)
    .on(privacyRead, (_, payload) => payload);
const $email = (0, effector_1.createStore)('')
    .on(emailUpdated, (_, payload) => payload);
const $comment = (0, effector_1.createStore)('')
    .on(commentUpdated, (_, payload) => payload);
const $file = (0, effector_1.createStore)(null)
    .on(fileUpdated, (_, payload) => payload);
const $isDisabled = $isPrivacy.map(state => !state);
const $isLoading = sendFx.pending;
const $isValid = $email.map(state => !!state);
const $isError = (0, effector_1.createStore)(false)
    .reset(emailUpdated);
const eventSent = (0, effector_1.createEvent)();
const validated = (0, effector_1.createEvent)();
const unvalidated = (0, effector_1.createEvent)();
const capchaSubmitted = (0, effector_1.createEvent)();
(0, patronum_1.condition)({
    source: eventSent,
    if: $isValid,
    then: validated,
    else: unvalidated
});
(0, effector_1.sample)({
    clock: validated,
    target: onValidate.trigger,
});
(0, effector_1.sample)({
    clock: capchaSubmitted,
    source: {
        email: $email,
        comment: $comment,
        file: $file,
    },
    target: sendFx,
});
(0, effector_1.sample)({
    clock: unvalidated,
    fn: () => true,
    target: $isError
});
(0, effector_1.sample)({
    clock: sendFx.doneData,
    target: onSuccess.trigger,
});
exports.orderFormModel = {
    $email,
    $comment,
    $file,
    $isPrivacy,
    emailUpdated,
    commentUpdated,
    fileUpdated,
    eventSent,
    privacyRead,
    capchaSubmitted,
    $isError,
    $isLoading,
    $isDisabled,
    onSuccess,
    onValidate,
};


/***/ }),

/***/ "./src/feature/index.ts":
/*!******************************!*\
  !*** ./src/feature/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./ModalPresentation */ "./src/feature/ModalPresentation/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./OrderForm */ "./src/feature/OrderForm/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./LoginForm */ "./src/feature/LoginForm/index.ts"), exports);


/***/ }),

/***/ "./src/pages/Home/Home.tsx":
/*!*********************************!*\
  !*** ./src/pages/Home/Home.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Home = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const sections_1 = __webpack_require__(/*! ./sections */ "./src/pages/Home/sections/index.ts");
const Home = () => React.createElement(React.Fragment, null,
    React.createElement(sections_1.Main, null),
    React.createElement(sections_1.Form, null),
    React.createElement(sections_1.Footer, null));
exports.Home = Home;


/***/ }),

/***/ "./src/pages/Home/index.ts":
/*!*********************************!*\
  !*** ./src/pages/Home/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Home = void 0;
var Home_1 = __webpack_require__(/*! ./Home */ "./src/pages/Home/Home.tsx");
Object.defineProperty(exports, "Home", ({ enumerable: true, get: function () { return Home_1.Home; } }));


/***/ }),

/***/ "./src/pages/Home/sections/Footer/Footer.tsx":
/*!***************************************************!*\
  !*** ./src/pages/Home/sections/Footer/Footer.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Footer = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ui_1 = __webpack_require__(/*! ../../../../shared/ui */ "./src/shared/ui/index.ts");
const rootClass = 'footer';
const Footer = () => {
    return React.createElement("footer", { className: rootClass },
        React.createElement("div", { className: `${rootClass}__container container` },
            React.createElement("div", { className: `${rootClass}__logo` },
                React.createElement(ui_1.ImageSvg, { src: 'small_logo', alt: 'logo' }),
                React.createElement("p", null, "Guangzhou Dupre export and trading Co., Ltd")),
            React.createElement("div", { className: `${rootClass}__contacts` },
                React.createElement("p", null, "mf@dupre.cn"),
                React.createElement("p", null, "(+86)18520504319")),
            React.createElement("p", { className: `${rootClass}__address` }, "\u5E7F\u5DDE\u5E02\u756A\u79BA\u533A\u5357\u6751\u9547\u4E07\u535A\u56DB\u8DEF68\u53F71\u697C1024")),
        React.createElement("div", { className: `${rootClass}__smoke ${rootClass}__smoke--top` }),
        React.createElement("div", { className: `${rootClass}__overlay` }),
        React.createElement(ui_1.WebpImage, { classes: `${rootClass}__background`, alt: 'background', imagePath: "footer_image", exc: "png" }));
};
exports.Footer = Footer;


/***/ }),

/***/ "./src/pages/Home/sections/Footer/index.ts":
/*!*************************************************!*\
  !*** ./src/pages/Home/sections/Footer/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Footer = void 0;
var Footer_1 = __webpack_require__(/*! ./Footer */ "./src/pages/Home/sections/Footer/Footer.tsx");
Object.defineProperty(exports, "Footer", ({ enumerable: true, get: function () { return Footer_1.Footer; } }));


/***/ }),

/***/ "./src/pages/Home/sections/Form/Form.tsx":
/*!***********************************************!*\
  !*** ./src/pages/Home/sections/Form/Form.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const feature_1 = __webpack_require__(/*! ../../../../feature */ "./src/feature/index.ts");
const rootClass = 'form';
const Form = () => {
    return React.createElement("section", { className: `${rootClass} container` },
        React.createElement("div", { className: `${rootClass}__info` },
            React.createElement("h2", { className: `${rootClass}__title` }, "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E"),
            React.createElement("p", { className: `${rootClass}__description` }, "\u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F \u0434\u043B\u044F \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439")),
        React.createElement(feature_1.OrderForm, { classes: `${rootClass}__form` }));
};
exports.Form = Form;


/***/ }),

/***/ "./src/pages/Home/sections/Form/index.ts":
/*!***********************************************!*\
  !*** ./src/pages/Home/sections/Form/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Form = void 0;
var Form_1 = __webpack_require__(/*! ./Form */ "./src/pages/Home/sections/Form/Form.tsx");
Object.defineProperty(exports, "Form", ({ enumerable: true, get: function () { return Form_1.Form; } }));


/***/ }),

/***/ "./src/pages/Home/sections/Main/Main.tsx":
/*!***********************************************!*\
  !*** ./src/pages/Home/sections/Main/Main.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ui_1 = __webpack_require__(/*! ../../../../shared/ui */ "./src/shared/ui/index.ts");
const utils_1 = __webpack_require__(/*! ../../../../shared/utils */ "./src/shared/utils/index.ts");
const rootClass = 'home-main';
const Main = () => {
    const { open } = utils_1.providers.modalProvider.useModal();
    return React.createElement("section", { className: `${rootClass}` },
        React.createElement(ui_1.VideoBackground, { classes: `${rootClass}__background`, video: 'main.mov', preview: 'main_preview.png' }),
        React.createElement("div", { className: `${rootClass}__smoke ${rootClass}__smoke--bottom` }),
        React.createElement("div", { className: `${rootClass}__content` },
            React.createElement("div", { className: `${rootClass}__header` },
                React.createElement(ui_1.ButtonIcon, { tag: 'a', href: '/login', className: `${rootClass}__button`, icon: 'account' }),
                React.createElement(ui_1.ButtonIcon, { className: `${rootClass}__button`, icon: 'download', onClick: () => open('presentation') })),
            React.createElement(ui_1.ImageSvg, { className: `${rootClass}__logo`, src: 'logo-surface', alt: 'logo' }),
            React.createElement("h1", { className: `${rootClass}__title` }, "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F OEM \u0438 ODM \u043F\u043E\u0434 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u043C \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430")));
};
exports.Main = Main;


/***/ }),

/***/ "./src/pages/Home/sections/Main/index.ts":
/*!***********************************************!*\
  !*** ./src/pages/Home/sections/Main/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Main = void 0;
var Main_1 = __webpack_require__(/*! ./Main */ "./src/pages/Home/sections/Main/Main.tsx");
Object.defineProperty(exports, "Main", ({ enumerable: true, get: function () { return Main_1.Main; } }));


/***/ }),

/***/ "./src/pages/Home/sections/index.ts":
/*!******************************************!*\
  !*** ./src/pages/Home/sections/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Main */ "./src/pages/Home/sections/Main/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Form */ "./src/pages/Home/sections/Form/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Footer */ "./src/pages/Home/sections/Footer/index.ts"), exports);


/***/ }),

/***/ "./src/pages/Login/Login.tsx":
/*!***********************************!*\
  !*** ./src/pages/Login/Login.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ui_1 = __webpack_require__(/*! ../../shared/ui */ "./src/shared/ui/index.ts");
const feature_1 = __webpack_require__(/*! ../../feature */ "./src/feature/index.ts");
const rootClass = 'login';
const Login = () => React.createElement("section", { className: rootClass },
    React.createElement("div", { className: `${rootClass}__left` },
        React.createElement(ui_1.VideoBackground, { classes: `${rootClass}__background`, video: 'login.mov', preview: 'login-preview.png' }),
        React.createElement(ui_1.ImageSvg, { className: `${rootClass}__desktop-logo`, src: 'logo-surface', alt: 'logo' })),
    React.createElement("div", { className: `${rootClass}__right` },
        React.createElement(ui_1.ImageSvg, { className: `${rootClass}__mobile-logo`, src: 'logo-colors', alt: 'logo' }),
        React.createElement("h1", { className: `${rootClass}__title` }, "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442"),
        React.createElement(feature_1.LoginForm, { classes: `${rootClass}__form` })));
exports.Login = Login;


/***/ }),

/***/ "./src/pages/Login/index.ts":
/*!**********************************!*\
  !*** ./src/pages/Login/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = void 0;
var Login_1 = __webpack_require__(/*! ./Login */ "./src/pages/Login/Login.tsx");
Object.defineProperty(exports, "Login", ({ enumerable: true, get: function () { return Login_1.Login; } }));


/***/ }),

/***/ "./src/pages/index.ts":
/*!****************************!*\
  !*** ./src/pages/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = exports.Home = void 0;
var Home_1 = __webpack_require__(/*! ./Home */ "./src/pages/Home/index.ts");
Object.defineProperty(exports, "Home", ({ enumerable: true, get: function () { return Home_1.Home; } }));
var Login_1 = __webpack_require__(/*! ./Login */ "./src/pages/Login/index.ts");
Object.defineProperty(exports, "Login", ({ enumerable: true, get: function () { return Login_1.Login; } }));


/***/ }),

/***/ "./src/shared/ui/Button/Button.tsx":
/*!*****************************************!*\
  !*** ./src/shared/ui/Button/Button.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const Loader_1 = __webpack_require__(/*! ../Loader */ "./src/shared/ui/Loader/index.ts");
const rootClass = 'button';
exports.Button = React.memo((_a) => {
    var { children, isDisabled, onPress, isLoading = false } = _a, props = __rest(_a, ["children", "isDisabled", "onPress", "isLoading"]);
    return React.createElement(Wrapper, Object.assign({}, props, { isLoading: isLoading, isDisabled: isDisabled, onPress: (isLoading || isDisabled) ? () => 0 : onPress }),
        React.createElement("div", { className: `${rootClass}__content` }, children),
        React.createElement(Loader_1.Loader, { classes: `${rootClass}__loader` }));
});
const Wrapper = React.memo(({ tag = 'button', children, href = '', download = false, onPress, classes, isLoading = false, isDisabled = false }) => {
    if (tag === 'a') {
        return (React.createElement("a", { className: `${rootClass} ${isLoading ? 'is-loading' : ''} ${isDisabled ? 'is-disabled' : ''} ${classes !== null && classes !== void 0 ? classes : ''}`, href: href, download: download }, children));
    }
    return (React.createElement("button", { className: `${rootClass} ${isLoading ? 'is-loading' : ''} ${isDisabled ? 'is-disabled' : ''} ${classes !== null && classes !== void 0 ? classes : ''}`, onClick: onPress }, children));
});


/***/ }),

/***/ "./src/shared/ui/ButtonIcon/ButtonIcon.tsx":
/*!*************************************************!*\
  !*** ./src/shared/ui/ButtonIcon/ButtonIcon.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonIcon = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ImageSvg_1 = __webpack_require__(/*! ../ImageSvg */ "./src/shared/ui/ImageSvg/index.ts");
const rootClass = 'button-icon';
exports.ButtonIcon = React.memo(({ tag = 'button', href, icon, size = 'm', className, onClick }) => {
    if (tag === 'a') {
        return React.createElement("a", { className: `${rootClass} ${rootClass}--size-${size} ${className}`, href: href },
            React.createElement(ImageSvg_1.ImageSvg, { className: `${rootClass}__image`, src: `icons/${icon}`, alt: 'icon' }));
    }
    return React.createElement("button", { className: `${rootClass} ${rootClass}--size-${size} ${className}`, onClick: onClick },
        React.createElement(ImageSvg_1.ImageSvg, { className: `${rootClass}__image`, src: `icons/${icon}`, alt: 'icon' }));
});


/***/ }),

/***/ "./src/shared/ui/ButtonIcon/index.ts":
/*!*******************************************!*\
  !*** ./src/shared/ui/ButtonIcon/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonIcon = void 0;
var ButtonIcon_1 = __webpack_require__(/*! ./ButtonIcon */ "./src/shared/ui/ButtonIcon/ButtonIcon.tsx");
Object.defineProperty(exports, "ButtonIcon", ({ enumerable: true, get: function () { return ButtonIcon_1.ButtonIcon; } }));


/***/ }),

/***/ "./src/shared/ui/Checkbox/Checkbox.tsx":
/*!*********************************************!*\
  !*** ./src/shared/ui/Checkbox/Checkbox.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checkbox = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ImageSvg_1 = __webpack_require__(/*! ../ImageSvg */ "./src/shared/ui/ImageSvg/index.ts");
const rootClass = 'checkbox';
exports.Checkbox = React.memo(({ classes, value, onChange, children }) => {
    return React.createElement("div", { className: `${rootClass} ${classes !== null && classes !== void 0 ? classes : ''} ${value ? 'is-active' : ''}`, onClick: () => onChange(!value) },
        React.createElement("span", { className: `${rootClass}__value` },
            React.createElement(ImageSvg_1.ImageSvg, { className: `${rootClass}__icon`, src: './icons/check', alt: 'icon' })),
        React.createElement("p", { className: `${rootClass}__text` }, children));
});


/***/ }),

/***/ "./src/shared/ui/Checkbox/index.ts":
/*!*****************************************!*\
  !*** ./src/shared/ui/Checkbox/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checkbox = void 0;
var Checkbox_1 = __webpack_require__(/*! ./Checkbox */ "./src/shared/ui/Checkbox/Checkbox.tsx");
Object.defineProperty(exports, "Checkbox", ({ enumerable: true, get: function () { return Checkbox_1.Checkbox; } }));


/***/ }),

/***/ "./src/shared/ui/ImageSvg/ImageSvg.tsx":
/*!*********************************************!*\
  !*** ./src/shared/ui/ImageSvg/ImageSvg.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageSvg = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
exports.ImageSvg = React.memo(({ className, src, alt }) => (React.createElement("img", { className: className, src: `./images/${src}.svg`, alt: alt, loading: "lazy" })));


/***/ }),

/***/ "./src/shared/ui/ImageSvg/index.ts":
/*!*****************************************!*\
  !*** ./src/shared/ui/ImageSvg/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageSvg = void 0;
var ImageSvg_1 = __webpack_require__(/*! ./ImageSvg */ "./src/shared/ui/ImageSvg/ImageSvg.tsx");
Object.defineProperty(exports, "ImageSvg", ({ enumerable: true, get: function () { return ImageSvg_1.ImageSvg; } }));


/***/ }),

/***/ "./src/shared/ui/Input/Input.tsx":
/*!***************************************!*\
  !*** ./src/shared/ui/Input/Input.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ImageSvg_1 = __webpack_require__(/*! ../ImageSvg */ "./src/shared/ui/ImageSvg/index.ts");
const react_1 = __webpack_require__(/*! react */ "react");
const rootClass = 'input';
exports.Input = React.memo(({ classes, value, onInput, icon, isTextarea, placeholder, type, isError }) => {
    const [fileName, setFileName] = (0, react_1.useState)('');
    return React.createElement("div", { className: `${rootClass} ${isError ? 'is-error' : ''} ${icon ? 'is-icon' : ''} ${classes !== null && classes !== void 0 ? classes : ''}` },
        !isTextarea && (React.createElement(React.Fragment, null, type === 'file'
            ? (React.createElement(React.Fragment, null,
                React.createElement("input", { className: `${rootClass}__file`, type: 'file', onChange: e => {
                        if (e.target.files && e.target.files[0]) {
                            onInput(e.target.files[0]);
                            setFileName(e.target.files[0].name);
                        }
                    } }),
                React.createElement("p", { className: `${rootClass}__value ${rootClass}__file-field` }, fileName || placeholder)))
            : (React.createElement("input", { className: `${rootClass}__value`, type: type, value: `${value}`, placeholder: placeholder, onChange: e => onInput(e.target.value) })))),
        isTextarea && (React.createElement("textarea", { className: `${rootClass}__value`, value: `${value}`, rows: 3, placeholder: placeholder, onChange: e => onInput(e.target.value) })),
        icon && (React.createElement(ImageSvg_1.ImageSvg, { className: `${rootClass}__icon`, src: `icons/${icon}`, alt: 'icon' })));
});


/***/ }),

/***/ "./src/shared/ui/Link/Link.tsx":
/*!*************************************!*\
  !*** ./src/shared/ui/Link/Link.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Link = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const rootClass = 'link';
exports.Link = React.memo(({ children, href }) => (React.createElement("a", { className: rootClass, href: href, target: "_blank", rel: "noopener noreferrer" }, children)));


/***/ }),

/***/ "./src/shared/ui/Link/index.ts":
/*!*************************************!*\
  !*** ./src/shared/ui/Link/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Link = void 0;
var Link_1 = __webpack_require__(/*! ./Link */ "./src/shared/ui/Link/Link.tsx");
Object.defineProperty(exports, "Link", ({ enumerable: true, get: function () { return Link_1.Link; } }));


/***/ }),

/***/ "./src/shared/ui/Loader/Loader.tsx":
/*!*****************************************!*\
  !*** ./src/shared/ui/Loader/Loader.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Loader = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const react_1 = __webpack_require__(/*! react */ "react");
const rootClass = 'loader';
exports.Loader = React.memo(({ view = 'surface', classes }) => {
    const color = (0, react_1.useMemo)(() => {
        switch (view) {
            case 'surface':
                return 'rgba(255, 255, 255, 1);';
            case 'brand':
                return 'rgba(14, 62, 139, 1);';
        }
    }, [view]);
    const gradientsId = {
        a: 'spinner-base-a',
        b: 'spinner-base-b',
    };
    const svgAttrs = (0, react_1.useMemo)(() => ({
        color,
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: `0 0 200 200`,
        width: '200',
        height: '200'
    }), [color]);
    return React.createElement("div", { className: `${rootClass} ${classes !== null && classes !== void 0 ? classes : ''}` },
        React.createElement("svg", Object.assign({}, svgAttrs),
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: gradientsId.a },
                    React.createElement("stop", { offset: '0%', stopOpacity: 0, stopColor: "currentColor" }),
                    React.createElement("stop", { offset: '100%', stopOpacity: 0.5, stopColor: "currentColor" })),
                React.createElement("linearGradient", { id: gradientsId.b },
                    React.createElement("stop", { offset: '0%', stopColor: "currentColor" }),
                    React.createElement("stop", { offset: '100%', stopOpacity: 0.5, stopColor: "currentColor" }))),
            React.createElement("g", { strokeWidth: 15 },
                React.createElement("path", { stroke: `url(#${gradientsId.a})`, d: "M15 100a85 85 0 0 1 170 0" }),
                React.createElement("path", { stroke: `url(#${gradientsId.b})`, d: "M185 100a85 85 0 0 1-170 0" }))));
});


/***/ }),

/***/ "./src/shared/ui/Loader/index.ts":
/*!***************************************!*\
  !*** ./src/shared/ui/Loader/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Loader = void 0;
var Loader_1 = __webpack_require__(/*! ./Loader */ "./src/shared/ui/Loader/Loader.tsx");
Object.defineProperty(exports, "Loader", ({ enumerable: true, get: function () { return Loader_1.Loader; } }));


/***/ }),

/***/ "./src/shared/ui/Modal/Modal.tsx":
/*!***************************************!*\
  !*** ./src/shared/ui/Modal/Modal.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const ButtonIcon_1 = __webpack_require__(/*! ../ButtonIcon */ "./src/shared/ui/ButtonIcon/index.ts");
const utils_1 = __webpack_require__(/*! ../../utils */ "./src/shared/utils/index.ts");
const react_1 = __webpack_require__(/*! react */ "react");
const rootClass = 'modal';
exports.Modal = React.memo(({ children, classes }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const { close } = utils_1.providers.modalProvider.useModal();
    const onClose = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
        setTimeout(() => {
            close();
        }, 300);
    };
    (0, react_1.useEffect)(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);
    return React.createElement("div", { className: `${rootClass} ${classes} ${isOpen ? 'is-open' : ''}` },
        React.createElement("div", { className: `${rootClass}__overlay`, onClick: onClose }),
        React.createElement("div", { className: `${rootClass}__wrapper` },
            React.createElement(ButtonIcon_1.ButtonIcon, { className: `${rootClass}__close`, size: 's', icon: 'cross', onClick: onClose }),
            React.createElement("div", { className: `${rootClass}__main` }, children)));
});


/***/ }),

/***/ "./src/shared/ui/Modal/index.ts":
/*!**************************************!*\
  !*** ./src/shared/ui/Modal/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
var Modal_1 = __webpack_require__(/*! ./Modal */ "./src/shared/ui/Modal/Modal.tsx");
Object.defineProperty(exports, "Modal", ({ enumerable: true, get: function () { return Modal_1.Modal; } }));


/***/ }),

/***/ "./src/shared/ui/VideoBackground/VideoBackground.tsx":
/*!***********************************************************!*\
  !*** ./src/shared/ui/VideoBackground/VideoBackground.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoBackground = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const react_1 = __webpack_require__(/*! react */ "react");
const rootClass = 'video-background';
exports.VideoBackground = React.memo(({ video, preview, classes }) => {
    const videoRef = (0, react_1.useRef)(null);
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const onLoadStart = (0, react_1.useCallback)(() => {
        var _a, _b;
        if (!isLoaded) {
            (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.load();
            (_b = videoRef.current) === null || _b === void 0 ? void 0 : _b.setAttribute('autoplay', 'true');
        }
    }, [isLoaded]);
    (0, react_1.useEffect)(() => {
        window.addEventListener('load', () => onLoadStart());
    }, []);
    return React.createElement("div", { className: `${rootClass} ${classes !== null && classes !== void 0 ? classes : ''}` },
        React.createElement("div", { className: `${rootClass}__overlay` }),
        React.createElement("video", { ref: videoRef, className: `${rootClass}__main`, preload: 'none', poster: `./images/${preview}`, loop: true, muted: true },
            React.createElement("source", { src: `./videos/${video}`, type: 'video/mp4' })));
});


/***/ }),

/***/ "./src/shared/ui/VideoBackground/index.ts":
/*!************************************************!*\
  !*** ./src/shared/ui/VideoBackground/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoBackground = void 0;
var VideoBackground_1 = __webpack_require__(/*! ./VideoBackground */ "./src/shared/ui/VideoBackground/VideoBackground.tsx");
Object.defineProperty(exports, "VideoBackground", ({ enumerable: true, get: function () { return VideoBackground_1.VideoBackground; } }));


/***/ }),

/***/ "./src/shared/ui/WebpImage/WebpImage.tsx":
/*!***********************************************!*\
  !*** ./src/shared/ui/WebpImage/WebpImage.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebpImage = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
exports.WebpImage = React.memo(({ imagePath, exc, alt, classes }) => (React.createElement("picture", { className: classes },
    React.createElement("source", { type: "image/webp", width: "100px", height: "100px", srcSet: `./images/${imagePath}.webp` }),
    React.createElement("source", { type: `image/${exc}`, width: "100px", height: "100px", srcSet: `./images/${imagePath}.${exc}` }),
    React.createElement("img", { srcSet: `./images/${imagePath}.${exc}`, alt: alt, loading: "lazy" }))));


/***/ }),

/***/ "./src/shared/ui/WebpImage/index.ts":
/*!******************************************!*\
  !*** ./src/shared/ui/WebpImage/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebpImage = void 0;
var WebpImage_1 = __webpack_require__(/*! ./WebpImage */ "./src/shared/ui/WebpImage/WebpImage.tsx");
Object.defineProperty(exports, "WebpImage", ({ enumerable: true, get: function () { return WebpImage_1.WebpImage; } }));


/***/ }),

/***/ "./src/shared/ui/index.ts":
/*!********************************!*\
  !*** ./src/shared/ui/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./VideoBackground */ "./src/shared/ui/VideoBackground/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./ImageSvg */ "./src/shared/ui/ImageSvg/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./ButtonIcon */ "./src/shared/ui/ButtonIcon/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Modal */ "./src/shared/ui/Modal/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Checkbox */ "./src/shared/ui/Checkbox/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Link */ "./src/shared/ui/Link/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./WebpImage */ "./src/shared/ui/WebpImage/index.ts"), exports);


/***/ }),

/***/ "./src/shared/utils/effector/createInstanceStore.ts":
/*!**********************************************************!*\
  !*** ./src/shared/utils/effector/createInstanceStore.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInstanceStore = void 0;
const effector_1 = __webpack_require__(/*! effector */ "effector");
/**
 * @component createInstanceStore
 * @description функция возвращает стор, trigger-effect и update-event для работы с инстансом фукнции
 *
 * @param {(params: P) => void} defaultValue - значние стора по умолчанию
 * @return set - Event обновления значения, trigger - Effect вызова функции, $instance - Store функции
 * */
const createInstanceStore = (defaultValue) => {
    const $instance = (0, effector_1.createStore)(defaultValue);
    const set = (0, effector_1.createEvent)();
    $instance.on(set, (_, payload) => payload);
    const trigger = (0, effector_1.attach)({
        source: {
            instance: $instance,
        },
        effect({ instance }, params) {
            return __awaiter(this, void 0, void 0, function* () {
                instance(params);
            });
        },
    });
    return {
        set,
        trigger,
        $instance,
    };
};
exports.createInstanceStore = createInstanceStore;


/***/ }),

/***/ "./src/shared/utils/effector/index.ts":
/*!********************************************!*\
  !*** ./src/shared/utils/effector/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.effector = void 0;
const createInstanceStore_1 = __webpack_require__(/*! ./createInstanceStore */ "./src/shared/utils/effector/createInstanceStore.ts");
exports.effector = {
    createInstanceStore: createInstanceStore_1.createInstanceStore,
};


/***/ }),

/***/ "./src/shared/utils/index.ts":
/*!***********************************!*\
  !*** ./src/shared/utils/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./navigation */ "./src/shared/utils/navigation/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./providers */ "./src/shared/utils/providers/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./effector */ "./src/shared/utils/effector/index.ts"), exports);


/***/ }),

/***/ "./src/shared/utils/navigation/index.ts":
/*!**********************************************!*\
  !*** ./src/shared/utils/navigation/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.navigation = void 0;
const routes_1 = __webpack_require__(/*! ./routes */ "./src/shared/utils/navigation/routes.ts");
exports.navigation = {
    Routes: routes_1.Routes,
};


/***/ }),

/***/ "./src/shared/utils/navigation/routes.ts":
/*!***********************************************!*\
  !*** ./src/shared/utils/navigation/routes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["HOME"] = "/";
    Routes["LOGIN"] = "/login";
    Routes["UNDEFINED"] = "/*";
})(Routes = exports.Routes || (exports.Routes = {}));


/***/ }),

/***/ "./src/shared/utils/providers/ModalProvider.tsx":
/*!******************************************************!*\
  !*** ./src/shared/utils/providers/ModalProvider.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useModal = exports.ModalProvider = void 0;
const React = __importStar(__webpack_require__(/*! react */ "react"));
const react_1 = __webpack_require__(/*! react */ "react");
const ModalContext = React.createContext({
    open: () => 0,
    close: () => 0
});
exports.ModalProvider = React.memo(({ children, modals }) => {
    const [activeModal, setActiveModal] = (0, react_1.useState)(null);
    const open = (modalName) => {
        setActiveModal(modalName);
    };
    const close = () => {
        setActiveModal(null);
    };
    return React.createElement(ModalContext.Provider, { value: {
            open,
            close,
        } },
        children,
        modals.map(({ name, component }) => {
            if (name === activeModal) {
                return component;
            }
        }));
});
const useModal = () => (0, react_1.useContext)(ModalContext);
exports.useModal = useModal;


/***/ }),

/***/ "./src/shared/utils/providers/index.ts":
/*!*********************************************!*\
  !*** ./src/shared/utils/providers/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.providers = void 0;
const modalProvider = __importStar(__webpack_require__(/*! ./ModalProvider */ "./src/shared/utils/providers/ModalProvider.tsx"));
exports.providers = {
    modalProvider,
};


/***/ }),

/***/ "@effector/reflect":
/*!************************************!*\
  !*** external "@effector/reflect" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@effector/reflect");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "effector":
/*!***************************!*\
  !*** external "effector" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("effector");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "patronum":
/*!***************************!*\
  !*** external "patronum" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("patronum");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-google-recaptcha":
/*!*****************************************!*\
  !*** external "react-google-recaptcha" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-google-recaptcha");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("react-router-dom/server");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map