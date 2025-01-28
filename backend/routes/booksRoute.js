import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// route for save new book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || 
            !request.body.author || 
            !request.body.publishYear) {
            return response.status(400).send('Title, author and publish year are required');
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send('Something went wrong');
    }
});

// route to get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

// route to get one book from database
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            data: book,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

// route for updating a book
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || 
            !request.body.author || 
            !request.body.publishYear) {
            return response.status(400).send({message: 'Title, author and publish year are required'});
        }
        const { id } = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);
        
        if (!book) {
            return response.status(404).send({message: 'Book not found'});
        } else {
            return response.status(200).send({message: 'Book updated successfully'});
        }
    } catch(error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

// route for deleting a book]
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return response.status(404).send({message: 'Book not found'});
        } else {
            return response.status(200).send({message: 'Book deleted successfully'});
        }
    } catch (error) { 
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
})

export default router;