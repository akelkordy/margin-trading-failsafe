import { Client, Provider, ProviderRegistry, Result } from '@blockstack/clarity';
import { assert } from 'chai';

// require ( Client, Provider, ProviderRegistry, Result );
// reqire ( assert );

describe("task status contract test suite", () => {
  let failSafeClient: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    failSafeClient = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.failsafe", "failsafe", provider);
  });

  it("should have a valid syntax", async () => {
    await failSafeClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
        await failSafeClient.deployContract();
    });
    it("should pass a non async test", () => {
        const result = "1";
        assert.equal(result, "1");
    });
    it("should return 1 after setting margin and limit", async () => {
        const query = failSafeClient.createQuery({ method: { name: "set-margin", args: ["2"] } });
        const returns = await failSafeClient.submitQuery(query);
        const result = Result.unwrap(returns);
        assert.equal(result, "(ok 1)");
    });
    it("should have correct balance and daily limit after a deposit", async () => {
        const query = failSafeClient.createQuery({ method: { name: "incoming-deposit", args: ["500"] } });
        const returns = await failSafeClient.submitQuery(query);
        const result = Result.unwrap(returns);
        assert.equal(result, "(ok 500)");
    });
    it("should have correct balance and daily limit after a withdrawal", async () => {
        const query = failSafeClient.createQuery({ method: { name: "incoming-withdrawal", args: ["500"] } });
        const returns = await failSafeClient.submitQuery(query);
        const result = Result.unwrap(returns);
        assert.equal(result, "(ok 4500)");
    });
    after(async () => {
        await provider.close();
    });
  });
});
