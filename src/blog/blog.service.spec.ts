import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { PrismaService } from '../prisma/prisma.service';

const blogs = [
  {
    id: 14,
    title: 'The Blog by user1',
    content: 'A beautiful blog createt by robert in the memory of his beloved',
    author: 'Akash Babu',
    likes: 1000,
    userId: 1,
  },
  {
    id: 15,
    title: 'The Blog by user2',
    content: 'A beautiful blog createt by robert in the memory of his beloved',
    author: 'Akash Babu',
    likes: 1000,
    userId: 2,
  },
  {
    id: 16,
    title: 'The Blog by user3',
    content: 'A beautiful blog createt by robert in the memory of his beloved',
    author: 'Akash Babu',
    likes: 1000,
    userId: 3,
  },
];

describe('BlogService', () => {
  let service: BlogService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService, PrismaService],
    }).compile();

    service = module.get<BlogService>(BlogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a Blog', () => {
    it(' should create a blog and save it', async () => {
      jest.spyOn(prisma.blog, 'create').mockResolvedValue(blogs[0]);
      const createdBlog = await prisma.blog.create({ data: blogs[0] });
      expect(createdBlog).toEqual(blogs[0]);
      expect(prisma.blog.create).toHaveBeenCalledWith({ data: blogs[0] });
    });
  });

  describe('Get the blogs', () => {
    it('should give all the blogs to the user who created them', async () => {
      jest.spyOn(prisma.blog, 'findMany').mockResolvedValue(blogs);
      const blogsRecieved = await prisma.blog.findMany({
        where: { userId: 3 },
      });
      expect(blogsRecieved).toEqual(blogs);
      expect(prisma.blog.findMany).toHaveBeenCalledWith({
        where: { userId: 3 },
      });
    });
  });

  describe('Update the  blog', () => {
    it('should update the blog', async () => {
      const updatedBlog = {
        id: 14,
        title: 'Upated title',
        content: 'Updated content',
        author: 'Updated author',
        likes: 1000,
        userId: 1,
      };
      jest.spyOn(prisma.blog, 'update').mockResolvedValue(updatedBlog);
      const updatedBlogResult = await prisma.blog.update({
        where: { id: 14 },
        data: updatedBlog,
      });
      expect(updatedBlogResult).toEqual(updatedBlog);
      expect(prisma.blog.update).toHaveBeenCalledWith({
        where: { id: 14 },
        data: updatedBlog,
      });
    });
  });

  describe('Delete the blog', () => {
    it('should delete the blog ', async () => {
      jest.spyOn(prisma.blog, 'delete').mockResolvedValue(blogs[0]);
      const deletedBlog = await prisma.blog.delete({ where: { id: 14 } });
      expect(deletedBlog).toEqual(blogs[0]);
      expect(prisma.blog.delete).toHaveBeenCalledWith({ where: { id: 14 } });
    });
  });
});
