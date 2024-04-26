"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const fs_1 = __importDefault(require("fs"));
class postService {
    async Create(post, req) {
        try {
            const imageBuffer = fs_1.default.readFileSync(req.file.path);
            const imageBase64 = imageBuffer.toString('base64');
            fs_1.default.unlinkSync(req.file.path);
            const publish = await prisma_1.prisma.post.create({
                data: {
                    title: post.title,
                    summary: post.summary,
                    image: imageBase64,
                    content: post.content,
                    authorID: post.authorID,
                    date: new Date(),
                },
            });
            console.log("Creating post with data:", post);
            return publish;
        }
        catch (error) {
            console.error("Error creating post:", error);
        }
    }
    ;
    async Read(post) {
        try {
            const posts = await prisma_1.prisma.post.findMany({
                include: {
                    author: { select: { name: true } }
                }
            });
            return posts;
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async ReadByID(postID) {
        try {
            const post = await prisma_1.prisma.post.findUnique({
                where: { id: postID },
                include: {
                    author: { select: { name: true } }
                }
            });
            return post;
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async Update(post) {
        try {
            if (!post.id) {
                throw new Error('This ID is not valid');
            }
            const postUpdated = await prisma_1.prisma.post.updateMany({
                where: { id: post.id },
                data: {
                    title: post.title,
                    summary: post.summary,
                    image: post.image,
                    content: post.content
                }
            });
            return postUpdated;
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    async Delete(id) {
        try {
            if (!id) {
                throw new Error();
            }
            const post = await prisma_1.prisma.post.findUnique({ where: { id } });
            if (!post) {
                throw new Error('Post not found');
            }
            const deleted = prisma_1.prisma.post.delete({ where: { id } });
            return deleted;
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
}
exports.default = postService;
//# sourceMappingURL=post.service.js.map