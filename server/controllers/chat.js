const { v4: uuidV4 } = require("uuid");

exports.chatRoom = async (req, res) => {
  const videoChatRoomId = uuidV4();
  return res.status(200).json({ msg: "success", videoChatRoomId });
};
