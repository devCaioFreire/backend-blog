"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../services/post.service"));
const fs_1 = __importDefault(require("fs"));
class postController {
    async Publish(req, res) {
        try {
            const Service = new post_service_1.default();
            if (!req.file) {
                return res.status(400).json({ error: 'Image is required' });
            }
            const { title, summary, content, authorID } = req.body;
            const image = req.file ? req.file.path : undefined;
            const published = await Service.Create({
                id: "",
                title,
                summary,
                content,
                authorID,
                image,
                date: new Date()
            }, req);
            res.status(201).json({
                message: 'Post created successfully',
                published: { ...published },
            });
        }
        catch (error) {
            console.error('Error publishing post:', error);
            res.status(500).json({ error: 'Failed to create post' });
        }
    }
    ;
    async Post(req, res) {
        const post = { ...req.body };
        const Service = new post_service_1.default();
        const getPosts = await Service.Read(post);
        res.status(200).json(getPosts);
    }
    ;
    async PostByID(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Post ID is required" });
        }
        const Service = new post_service_1.default();
        const getPost = await Service.ReadByID(id);
        if (!getPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(getPost);
    }
    ;
    async PostPut(req, res) {
        const id = req.params.id;
        if (!id) {
            throw new Error("Post ID is required");
        }
        const PostToUpdate = { ...req.body };
        let imageBase64;
        if (req.file) {
            const imageBuffer = fs_1.default.readFileSync(req.file.path);
            imageBase64 = imageBuffer.toString('base64');
        }
        PostToUpdate.id = id;
        imageBase64 != undefined ? PostToUpdate.image = imageBase64 : undefined;
        const formData = { ...PostToUpdate };
        console.log(formData);
        const Service = new post_service_1.default();
        const edit = await Service.Update(formData);
        res.status(200).json(edit);
    }
    ;
    async PostDelete(req, res) {
        const { id } = req.params;
        const Service = new post_service_1.default();
        const deleted = await Service.Delete(id);
        res.status(200).json(deleted);
    }
    ;
}
exports.default = postController;
//# sourceMappingURL=post.controller.js.map