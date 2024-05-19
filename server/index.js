const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Initialize express app and use CORS middleware
const app = express();
app.use(cors());

// MongoDB connection URI
const uri = "mongodb+srv://rajatsanjaysharma:RWQtX3BDJY0l2Syr@cluster0.kwwdxs2.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB once and reuse the connection
let database, simplify_jobs, simplify_company, h1b_jobs, h1b_company;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to database");
        database = client.db('h1b-salary-data-combined');
        simplify_jobs = database.collection('simplify-jobs-data');
        simplify_company = database.collection('simplify-company-data');
        h1b_jobs = database.collection('h1bgrader-jobs');
        h1b_company = database.collection('h1bgrader-companies');
        headcount_company = database.collection('head-counts-all-companies');
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit(1);
    }
}

// Simplified fetchData function that assumes database connection is already established
async function fetchData(collection, query) {
    try {
        const result = await collection.findOne(query);
        return result;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

// API endpoint to get company data from simplify
app.get('/get-company-data-simplify', async (req, res) => {
    try {
        const query = { name: req.query.name };
        const companyData = await fetchData(simplify_company, query);
        if (companyData) {
            res.status(200).json(companyData);
        } else {
            res.status(404).send('No company data found.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/get-company-insights', async (req, res) => {
    const companyName = req.query.companyName;  // Retrieve the company name from query parameters
    if (!companyName) {
        return res.status(400).send('Company name is required as a query parameter.');
    }

    const companyNameDecoded = decodeURIComponent(companyName);  // Correctly decode the company name

    // Dynamically setting the projection
    const projection = { '_id': 0 };  // Assuming you always want to exclude _id
    projection[companyNameDecoded] = 1;  // Dynamically add the decoded company name to the projection

    try {
        const result = await headcount_company.find({}).project(projection).toArray();
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('No company insights found for the specified company.');
        }
    } catch (error) {
        res.status(500).json({ message: "Error accessing the database", error });
    }
});



// API endpoint to get high wage jobs
app.get('/high-wage-jobs', async (req, res) => {
    try {
        const query = { 'Average Wage': { $gt: 200000 } };
        const highWageJob = await fetchData(h1b_jobs, query);
        if (highWageJob) {
            res.status(200).json(highWageJob);
        } else {
            res.status(404).send('No high wage jobs found.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server and connect to the database
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
});