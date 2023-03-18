import { Command } from "@sapphire/framework";
import { ApplicationCommandType, Message } from "discord.js";
import { db } from "../lib/db";

export class UpvoteCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerContextMenuCommand((builder) =>
      builder.setName(this.name).setType(ApplicationCommandType.Message)
    );
  }

  public override async contextMenuRun(
    interaction: Command.ContextMenuCommandInteraction
  ) {
    if (
      interaction.isMessageContextMenuCommand() &&
      interaction.targetMessage instanceof Message
    ) {
      const message = await db.message.findUnique({
        where: { discordId: interaction.targetMessage.id },
      });

      if (!message) {
        await db.message.create({
          data: {
            discordId: interaction.targetMessage.id,
            content: interaction.targetMessage.content,
            user: {
              connectOrCreate: {
                where: { discordId: interaction.targetMessage.author.id },
                create: {
                  discordId: interaction.targetMessage.author.id,
                  username: interaction.targetMessage.author.username,
                },
              },
            },
          },
        });
      }

      await db.message.update({
        where: { discordId: interaction.targetMessage.id },
        data: { upvotes: { increment: 1 } },
      });

      interaction.reply({
        content: "Upvoted!",
        options: {
          content: "Upvoted!",
          ephemeral: true,
        },
      });
    }
  }
}
