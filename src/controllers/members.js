const db = require("../models");
const { generateS3Url } = require("../helpers/generateS3url");
const { parseS3Url } = require("../helpers/parseS3Url");
const { updateFile, uploadFile, deleteFile } = require("../services/aws_s3");
const entity = "members";

const getAllMembers = async function (req, res, next) {
  try {
    const membersFound = await db[entity].findAll({      
      order: [["createdAt", "DESC"]],
    });

<<<<<<< HEAD
    const Members = membersFound.map((item) => {
=======
    const members = membersFound.map((item) => {
>>>>>>> fb1a2992150d29286d38c1c7ce24d871f5d5fc26
      if (item.image) {
        const parsedImage = parseS3Url(item.image);
        item.image = parsedImage;
      }
      return item;
    });

    res.send({
<<<<<<< HEAD
      Members,
=======
      members,
>>>>>>> fb1a2992150d29286d38c1c7ce24d871f5d5fc26
    });
  } catch (err) {
    next(err);
  }
};

const getMemberById = async function (req, res, next) {
  try {
    const { id } = req.params;
    let foundMember = await db[entity].findOne({ where: { id: id } });
      if (foundMember){
        if (foundMember.image) {
          const parsedImage = parseS3Url(foundMember.image);
          foundMember.image = parsedImage;
        }
      return res.status(200).send({ title: "Miembro", member: foundMember });
     }
    let err = new Error("Member not found");
    err.name = "NotFoundError";
    throw err;
  } 
  catch (err) {
    next(err);
  }
};

const postMember = async function (req, res, next) {
  try {
    if (req.file) {
      const { url } = await uploadFile(req.file, next);
      req.body.image = url;
    } else {
      req.body.image = null;
    }

    const memberCreated = await db[entity].create(req.body);
    return res.status(201).send({
      title: "Members",
      message: "Member created succesfully",
      newMember: memberCreated,
    });
  } catch (err) {
    next(err);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMember = await db[entity].destroy({
      where: {
        id,
      },
    });
    if (!deleteMember) {
      let err = new Error("Member not found");
      err.name = "NotFoundError";
      throw err;
    }

    res.status(200).send({
      message: "Member deleted succesfully!",
    });
  } catch (err) {
    next(err);
  }
};

const updateMember = async function (req, res, next) {
  try {
    const { id } = req.params;
    let { name, image, key } = req.body;

    if (req.file){
      if (key){
        const {url} = await updateFile(req.file, key, next)
        image = url
      }
      else{
        const {url} = await uploadFile(req.file, next)
        image = url
      } 
    }else{
      if (key){
        const url = generateS3Url(key)
        image = url
      }
    }
    const memberUpdate = await db[entity].update(
      {name, image},
      {where: { id: id,} }
      );

      if (memberUpdate) {
        return res.status(200).send({
          title: "Member",
          message: "Member updated successfully",
          update: memberUpdate,
        });
      } else {
        let err = new Error("Member not found");
        err.name = "NotFoundError";
        throw err;
      }
  } catch (err) {
    next(err);
  }
};

const membersController = {
  getAllMembers,
  getMemberById,
  postMember,
  deleteMember,
  updateMember,
};

module.exports = membersController;
