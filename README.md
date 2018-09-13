# RoyaleBot-rewritten
RoyaleBot is a discord bot centered around Fortnite allowing its users to recieve automatic updates and check their stats.

## What is this?
This is a WIP rewrite of RoyaleBot aiming to improve memory efficiency, speed and scalability. This version of RoyaleBot is public feel free to PR your own code, if it passes review it will be added.

## Can I run my own private version of RoyaleBot
It is possible to run a local version of RoyaleBot.

You must set the following ENV variables before runtime:

- `TOKEN` - Your [discord api](https://discordapp.com/developers/applications/) bot token
- `DATABASE_URL` - A postgres URL with r/w access to a database

The database must be set up before runtime:

See [initTables.sql](initTables.sql)

After you have done everything above you can run the bot using `npm start`.
_I will not provide any support running your own private version, sorry._

## License

Code in this repository is licensed under the Apache-2.0 license, see [LICENSE](LICENSE).
