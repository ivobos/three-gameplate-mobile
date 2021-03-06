import * as Moniker from 'moniker';
import * as socketServer from './socketServer';
import * as userRegistry from './userRegistry';
import * as messageTypes from "../common/messageTypes";

class LoginHandler {
    constructor(transportHandler, onLoginSuccessHandler) {
        this.transportHandler = transportHandler;
        this.username = undefined;
        this.transportHandler.setRxCallback(messageTypes.LOGIN_TYPE, this.rxCallback.bind(this));
        this.onLoginSuccessHandler = onLoginSuccessHandler;
    }

    getUsername() {
        return this.username;
    }

    rxCallback(message) {
        if (VERSION !== message.version) {
            this.transportHandler.send(messageTypes.LOGIN_TYPE, {
                    success: false,
                    action: "Update",
                    message: "Update to version "+VERSION
                });
            return;
        }
        if (message.username) {
            if (socketServer.isUserConnected(message.username)) {
                console.log("user already logged in");
                this.transportHandler.send(messageTypes.LOGIN_TYPE, {
                    success: false,
                    action: "Retry",
                    message: "User already logged in on another device."
                });
                return;
            }
        }
        if (message.username === undefined) {
            this.username = Moniker.choose();
            console.log("Generating new user name");
        } else {
            this.username = message.username;
        }
        userRegistry.setUserUuid(this.username, message.uuid);
        this.transportHandler.send(messageTypes.LOGIN_TYPE, {
            success: true,
            username: this.username,
            uuid: userRegistry.getUuid(this.username)
        });
        this.onLoginSuccessHandler();
    }
}

export default LoginHandler;