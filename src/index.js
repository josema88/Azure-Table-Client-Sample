const { TableClient, TablesSharedKeyCredential } = require("@azure/data-tables");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>";

// Use TablesSharedKeyCredential with storage account and account key
// TablesSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new TablesSharedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

async function main() {
  let entitiesIter = client.listEntities();
  let i = 1;
  for await (const entity of entitiesIter) {
    console.log(`Entity${i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
    i++;
  }
}

main();