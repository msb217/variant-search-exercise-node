import Sequelize from 'sequelize'
import sequelize from "../index"
const Variant = sequelize.define(
  'variant',
  {
    gene: Sequelize.STRING,
    nucleotide_change: Sequelize.TEXT,
    protein_change: Sequelize.TEXT,
    other_mappings: Sequelize.TEXT,
    alias: Sequelize.STRING,
    transcripts: Sequelize.STRING,
    region: Sequelize.STRING,
    reported_classification: Sequelize.TEXT,
    inferred_classification: Sequelize.TEXT,
    source: Sequelize.STRING,
    last_evaluated: Sequelize.DATE,
    last_updated: Sequelize.DATE,
    url: Sequelize.STRING,
    submitter_comment: Sequelize.TEXT,
    assembly: Sequelize.STRING,
    chr: Sequelize.STRING,
    genomic_start: Sequelize.STRING,
    genomic_stop: Sequelize.STRING,
    ref: Sequelize.STRING,
    alt: Sequelize.STRING,
    accession: Sequelize.STRING,
    reported_ref: Sequelize.STRING,
    reported_alt: Sequelize.STRING,
  },
  {
    underscored: true,
    timestamps: false
  }
)

export default {
  Variant
}