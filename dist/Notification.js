"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationManager_1 = __importDefault(require("./NotificationManager"));
const crypto_1 = __importDefault(require("crypto"));
const events_1 = require("events");
/**
 * Represents a Notification.
 * Emits two events:
 *  - display: Fires when the notification is actually visible
 *  - close: Fires when the notification is closed
 *
 * @class Notification
 */
class Notification extends events_1.EventEmitter {
    /**
     * Creates an instance of Notification.
     * @param {INotificationOptions} options
     * @memberof Notification
     */
    constructor(options) {
        super();
        this.id = crypto_1.default.randomUUID();
        this.options = options;
        if (!options.showDelete) {
            this.options.showDelete = false;
        }
        if (!options.showDelete) {
            this.options.showProgressbar = false;
        }
    }
    /**
     * Asks the NotificationManager to remove this notification.
     *
     * @memberof Notification
     */
    close() {
        NotificationManager_1.default.destroyNotification(this);
    }
    /**
     * Returns the processed template source.
     *
     * @returns
     * @memberof Notification
     */
    getSource() {
        var _a;
        if (!this.options.content)
            return '';
        const firstClosingTagIndex = (_a = this.options.content) === null || _a === void 0 ? void 0 : _a.indexOf('>');
        const idAttribute = ` data-notification-id="${this.id}"`;
        const output = [
            this.options.content.slice(0, firstClosingTagIndex),
            idAttribute,
            this.options.content.slice(firstClosingTagIndex)
        ];
        return { ...this.options, content: output.join('') };
    }
}
exports.default = Notification;
//# sourceMappingURL=Notification.js.map