import statistics from './api/statistics';
import feeApi from './api/fee-api';
import projectedBlocks from './api/projected-blocks';

class Routes {
  private cache = {};

  constructor() {
    this.createCache();
    setInterval(this.createCache.bind(this), 600000);
  }

  private async createCache() {
    this.cache['24h'] = await statistics.$list24H();
    this.cache['1w'] = await statistics.$list1W();
    this.cache['1m'] = await statistics.$list1M();
    this.cache['3m'] = await statistics.$list3M();
    this.cache['6m'] = await statistics.$list6M();
    console.log('Statistics cache created');
  }

  public async get2HStatistics(req, res) {
    const result = await statistics.$list2H();
    res.send(result);
  }

  public get24HStatistics(req, res) {
    res.send(this.cache['24h']);
  }

  public get1WHStatistics(req, res) {
    res.send(this.cache['1w']);
  }

  public get1MStatistics(req, res) {
    res.send(this.cache['1m']);
  }

  public get3MStatistics(req, res) {
    res.send(this.cache['3m']);
  }

  public get6MStatistics(req, res) {
    res.send(this.cache['6m']);
  }

  public async getRecommendedFees(req, res) {
    const result = feeApi.getRecommendedFee();
    res.send(result);
  }

  public async $getgetTransactionsForBlock(req, res) {
    const result = await feeApi.$getTransactionsForBlock(req.params.id);
    res.send(result);
  }

  public async getgetTransactionsForProjectedBlock(req, res) {
    try {
      const result = await projectedBlocks.getProjectedBlockFeesForBlock(req.params.id);
      res.send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  public async getProjectedBlocks(req, res) {
    try {
      let txId: string | undefined;
      if (req.query.txId && /^[a-fA-F0-9]{64}$/.test(req.query.txId)) {
        txId = req.query.txId;
      }
      const result = await projectedBlocks.getProjectedBlocks(txId, 6);
      res.send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

export default new Routes();
