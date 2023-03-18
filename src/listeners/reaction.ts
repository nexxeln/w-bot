import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";

@ApplyOptions<Listener.Options>({
  event: Events.MessageReactionAdd,
  enabled: true,
  once: false,
  name: "reaction",
})
export class UserEvent extends Listener {
  public async run() {
    const { logger } = this.container;
    logger.info("Reaction added");
  }
}
