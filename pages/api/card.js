import { BaseCardBuilder, RankCardBuilder, InfoCardBuilder, WelcomeBuilder, LeaveBuilder } from 'discord-card-canvas';

export default async function handler(req, res) {
  try {
    const { type = "rank" } = req.query;
    let buffer;

    switch(type.toLowerCase()) {
      case "rank": {
        const card = new RankCardBuilder({
          nicknameText: { content: req.query.username || "Anonymous" },
          currentLvl: parseInt(req.query.level) || 1,
          currentRank: parseInt(req.query.rank) || 1,
          currentXP: parseInt(req.query.currentXP) || 0,
          requiredXP: parseInt(req.query.requiredXP) || 100,
          userStatus: req.query.status || "online",
          avatarImgURL: req.query.avatarImgURL || "https://i.pravatar.cc/150",
          backgroundColor: req.query.backgroundColor || "#0CA7FF",
          fontDefault: req.query.font || "Nunito",
          progressBarColor: req.query.progressBarColor || "#0CA7FF"
        });
        buffer = await card.build();
        break;
      }

      case "base": {
        const card = new BaseCardBuilder()
          .setMainText(req.query.mainText || "Welcome")
          .setNicknameText(req.query.nickname || "Anonymous")
          .setSecondText(req.query.secondText || "to the server")
          .setAvatarImgURL(req.query.avatarImgURL || "https://i.pravatar.cc/150")
          .setBackgroundColor(req.query.backgroundColor || "#0CA7FF")
          .setFontDefault(req.query.font || "Nunito");
        buffer = await card.build();
        break;
      }

      case "info": {
        const card = new InfoCardBuilder()
          .setMainText(req.query.mainText || "Information")
          .setBackgroundColor(req.query.backgroundColor || "#0CA7FF");
        if(req.query.backgroundImgURL) card.setBackgroundImgURL(req.query.backgroundImgURL);
        buffer = await card.build();
        break;
      }

      case "welcome": {
        const card = new WelcomeBuilder({
          nicknameText: { content: req.query.nickname || "Anonymous" },
          secondText: { content: req.query.secondText || "Welcome!" },
          avatarImgURL: req.query.avatarImgURL || "https://i.pravatar.cc/150"
        });
        card.setFontDefault(req.query.font || "Nunito");
        buffer = await card.build();
        break;
      }

      case "leave": {
        const card = new LeaveBuilder({
          nicknameText: { content: req.query.nickname || "Anonymous" },
          avatarImgURL: req.query.avatarImgURL || "https://i.pravatar.cc/150"
        });
        card.setSecondText({ content: req.query.secondText || "Goodbye!" });
        card.setFontDefault(req.query.font || "Nunito");
        buffer = await card.build();
        break;
      }

      default:
        return res.status(400).send("Invalid type");
    }

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: " + err.message);
  }
}
