const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');

// Initialize express app and use CORS middleware
const app = express();
app.use(cors());
const uri = "mongodb+srv://rajatsanjaysharma:RWQtX3BDJY0l2Syr@cluster0.kwwdxs2.mongodb.net/";
const client = new MongoClient(uri);

const database = client.db('h1b-salary-data-combined');
const simplify_jobs = database.collection('simplify-jobs-data');
const simplify_company = database.collection('simplify-company-data');
const h1b_jobs = database.collection('h1bgrader-jobs');
const h1b_company = database.collection('h1bgrader-companies');


/*
    Long Form of Fetching data from partiuclar databases.
*/
async function fetchData_h1b_jobs(query) {
    await client.connect();
    return await h1b_jobs.findOne(query);
}

async function fetchData_h1b_company(query) {
    await client.connect();
    return await h1b_company.findOne(query);
}

async function fetchData_simplify_jobs(query) {
    await client.connect();
    return await simplify_jobs.findOne(query);
}

async function fetchData_simplify_company(query) {
    await client.connect();
    return await simplify_company.findOne(query);
}

/*
    Short Form of Fetching data from partiuclar databases.
*/

async function fetchData(collectionName, query) {
    try {
        await client.connect();
        const db = client.db('h1b-salary-data-combined');
        const collection = db.collection(collectionName);
        return await collection.findOne(query);
    } finally {
        await client.close();
    }
}

app.get('/get-company-data-simplify', async (req, res) => {
    try {
        // const query = { 'Company Name' : 'Zoox'};
        const query = req.query;
        const job = await fetchData('simplify-company-data', query);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).send('Something went wrong.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.get('/high-wage-jobs', async (req, res) => {
    try {
        const query = {'Average Wage': { $gt: 200000 }};
        const job = await fetchData('h1bgrader-jobs', query);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).send('No high wage jobs found.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});


/*
    Example of POST CALL
*/

// app.post('/jobs', async (req, res) => {
//     try {
//         await client.connect();
//         const database = client.db('h1b-salary-data-combined');
//         const h1b_jobs = database.collection('h1bgrader-jobs');
//         const payload = req.body; // This is the payload from the POST request
//         const jobs = await h1b_jobs.find(payload).toArray();
//         res.status(200).json(jobs);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     } finally {
//         await client.close();
//     }
// });

/*
    Example of Get Call with Params & Query
*/

// app.get('/jobs', async (req, res) => {
//     try {
//         await client.connect();
//         const database = client.db('h1b-salary-data-combined');
//         const h1b_jobs = database.collection('h1bgrader-jobs');
//         const query = req.query; // This contains the search parameters
//         const jobs = await h1b_jobs.find(query).toArray();
//         res.status(200).json(jobs);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     } finally {
//         await client.close();
//     }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});