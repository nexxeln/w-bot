import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { ApplicationCommandType, Message } from "discord.js";

@ApplyOptions<Command.Options>({
  name: "pew",
  description: "pew pew pew",
})
export class SlashCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName(this.name).setType(ApplicationCommandType.Message)
    );
  }

  public override contextMenuRun(
    interaction: Command.ContextMenuCommandInteraction
  ) {
    if (
      interaction.isMessageContextMenuCommand() &&
      interaction.targetMessage instanceof Message
    ) {
      interaction.reply({
        content: `pew pew pew ${interaction.targetMessage}`,
        options: {
          ephemeral: true,
        },
      });
    }
  }
}
