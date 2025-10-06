/** @odoo-module **/
/*  Copyright 2024 Tecnativa - Carlos Lopez
    License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).
*/
import {registerMessagingComponent} from "@mail/utils/messaging_component";
const {Component} = owl;

export class ForwardMessage extends Component {
    async onClickForwardMessage() {
        const action = await this.env.services.orm.call(
            "mail.message",
            "action_wizard_forward",
            [[this.props.message.id]]
        );

        await this.env.services.action.doAction(action, {
            additional_context: {
                active_id: this.props.message.id,
                active_ids: [this.props.message.id],
                active_model: "mail.message",
            },
            onClose: () => {
                const thread = this.props.message.originThread;
                if (thread) {
                    thread.fetchData(["messages"]);
                }
            },
        });
    }
}

ForwardMessage.template = "mail_forward.ForwardMessage";
ForwardMessage.props = {
    message: Object,
};

registerMessagingComponent(ForwardMessage);
