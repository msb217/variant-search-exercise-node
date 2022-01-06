import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import _ from 'lodash'
import fs from 'fs'
import cors from 'cors'
import sequelize from './db'
import { parse } from 'csv-parse'
import './db/models'

const config = {
  port: 8000,
}

function initServer () {
  const app = express()
  app.use(cors())
  app.use(
    bodyParser.urlencoded({
      limit: '50mb'
    })
  )
  app.use(
    bodyParser.json({
      limit: '50mb'
    })
  )
  app.use(morgan('dev'))
  app.use('/variants', require('./routes/variant'))
  // global error handling
  app.use(function (err, req, res, next) {
    if (err) {
      console.error(err.message, JSON.stringify(err.stack))
      res.status(parseInt(err.code) || 500).send(err.message)
    } else {
      next()
    }
  })
  app.use('*', async (req, res, next) => {
    res.status(404).send()
  })
  app.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`)
  })
}

const init = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true })
  console.log('Connection has been established successfully.');

  // Initialize the parser
  const parser = parse({
    delimiter: '\t',
    fromLine: 2,
    relaxQuotes: true,
    relaxColumnCount: true,
    trim: true

  });
  const records = [];
  // Use the readable stream api to consume records
  parser.on('readable', function(){
    let record;
    while ((record = parser.read()) !== null) {
      while (record.length < 23) {
        record.push("")
      }
      records.push({
        gene: record[0],
        nucleotide_change: record[1],
        protein_change: record[2],
        other_mappings: record[3],
        alias: record[4],
        transcripts: record[5],
        region: record[6],
        reported_classification: record[7],
        inferred_classification: record[8],
        source: record[9],
        last_evaluated: record[10] && record[10].length ? new Date(record[10]) : null,
        last_updated: record[11] && record[11].length ? new Date(record[11]) : null,
        url: record[12],
        submitter_comment: record[13],
        assembly: record[14],
        chr: record[15],
        genomic_start: record[16],
        genomic_stop: record[17],
        ref: record[18],
        alt: record[19],
        accession: record[20],
        reported_ref: record[21],
        reported_alt: record[22]
      });
    }
  });
  parser.on('error', function(err){
    console.error(err.message);
  });

  fs.createReadStream('src/db/data/variants.tsv')
    .on('data', function (row) {
      parser.write(row);
    })
    .on('end', async function () {
      parser.end();
      await sequelize.getQueryInterface().bulkInsert('variants', records)
      console.log('Dumped variants data into sqlite database. Number of records: ', records.length)
      initServer()
    })
}

init()