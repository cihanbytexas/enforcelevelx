import { BaseCardBuilder, RankCardBuilder, InfoCardBuilder } from 'discord-card-canvas';

export default async function handler(req, res) {
  try {
    const { type = "rank" } = req.query; // kart tipi: rank, base, info

    let buffer;

    if (type === "rank") {
      const username = req.query.username || "Anonymous";
      const level = parseInt(req.query.level) || 1;
      const rank = parseInt(req.query.rank) || 1;
      const currentXP = parseInt(req.query.currentXP) || 0;
      const requiredXP = parseInt(req.query.requiredXP) || 100;
      const status = req.query.status || "online";
      const avatarURL = req.query.avatarImgURL || "https://i.pravatar.cc/150";

      const card = new RankCardBuilder()
        .setNickname(username)
        .setCurrentLvl(level)
        .setCurrentRank(rank)
        .setCurrentXP(currentXP)
        .setRequiredXP(requiredXP)
        .setUserStatus(status)
        .setBackgroundColor('#0CA7FF')
        .setAvatarImgURL(avatarURL)
        .setProgressBarColor('#ffffff');

      buffer = await card.build();

    } else if (type === "base") {
      const mainText = req.query.mainText || "Welcome";
      const nickname = req.query.nickname || "Anonymous";
      const secondText = req.query.secondText || "to the server";
      const avatarURL = req.query.avatarImgURL || "https://i.pravatar.cc/150";

      const card = new BaseCardBuilder()
        .setMainText(mainText)
        .setNicknameText(nickname)
        .setSecondText(secondText)
        .setBackgroundColor('#0CA7FF')
        .setAvatarImgURL(avatarURL)
        .setAvatarBorderColor('#ffffff');

      buffer = await card.build();

    } else if (type === "info") {
      const mainText = req.query.mainText || "Information";

      const card = new InfoCardBuilder()
        .setMainText(mainText)
        .setBackgroundColor('#0CA7FF');

      buffer = await card.build();

    } else {
      return res.status(400).send("Invalid type");
    }

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error: " + err.message);
  }
}
