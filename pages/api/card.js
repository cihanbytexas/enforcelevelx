import { BaseCardBuilder, RankCardBuilder, InfoCardBuilder } from 'discord-card-canvas';

export default async function handler(req, res) {
  const { type = "rank" } = req.query; // kart türü: rank, base, info

  let buffer;

  if (type === "rank") {
    const { username = "Anonymous", level = 5, rank = 10, currentXP = 120, requiredXP = 200, status = "online" } = req.query;

    const card = new RankCardBuilder()
      .setNickname(username)
      .setCurrentLvl(parseInt(level))
      .setCurrentRank(parseInt(rank))
      .setCurrentXP(parseInt(currentXP))
      .setRequiredXP(parseInt(requiredXP))
      .setUserStatus(status)
      .setBackgroundColor('#0CA7FF')
      .setAvatarImgURL('https://i.pravatar.cc/150')
      .setProgressBarColor('#ffffff');

    buffer = await card.build();

  } else if (type === "base") {
    const { mainText = "Welcome", nickname = "Anonymous", secondText = "to the server" } = req.query;

    const card = new BaseCardBuilder()
      .setMainText(mainText)
      .setNicknameText(nickname)
      .setSecondText(secondText)
      .setBackgroundColor('#0CA7FF')
      .setAvatarImgURL('https://i.pravatar.cc/150')
      .setAvatarBorderColor('#ffffff');

    buffer = await card.build();

  } else if (type === "info") {
    const { mainText = "Information" } = req.query;

    const card = new InfoCardBuilder()
      .setMainText(mainText)
      .setBackgroundColor('#0CA7FF');

    buffer = await card.build();
  } else {
    return res.status(400).send("Invalid type");
  }

  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
}
