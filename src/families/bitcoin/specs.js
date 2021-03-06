// @flow
import expect from "expect";
import { BigNumber } from "bignumber.js";
import invariant from "invariant";
import type { Transaction } from "./types";
import { getCryptoCurrencyById, parseCurrencyUnit } from "../../currencies";
import { pickSiblings } from "../../bot/specs";
import type { MutationSpec, AppSpec } from "../../bot/types";

const bitcoinLikeMutations = ({
  minimalAmount = BigNumber("10000"),
  targetAccountSize = 2,
}: $Shape<{
  minimalAmount: BigNumber,
  targetAccountSize: number,
}> = {}): MutationSpec<Transaction>[] => [
  {
    name: "move 50% to another account",
    maxRun: 2,
    transaction: ({ account, siblings, bridge }) => {
      invariant(account.balance.gt(minimalAmount), "balance is too low");
      let t = bridge.createTransaction(account);
      const sibling = pickSiblings(siblings, targetAccountSize);
      const recipient = sibling.freshAddress;
      const amount = account.balance.div(2).integerValue();
      t = bridge.updateTransaction(t, { amount, recipient });
      return t;
    },
    test: ({ account, accountBeforeTransaction, operation }) => {
      // can be generalized!
      expect(account.balance.toString()).toBe(
        accountBeforeTransaction.balance.minus(operation.value).toString()
      );
    },
  },
  {
    name: "send max to another account",
    maxRun: 1,
    transaction: ({ account, siblings, bridge }) => {
      invariant(account.balance.gt(minimalAmount), "balance is too low");
      let t = bridge.createTransaction(account);
      const sibling = pickSiblings(siblings, targetAccountSize);
      const recipient = sibling.freshAddress;
      t = bridge.updateTransaction(t, { useAllAmount: true, recipient });
      return t;
    },
    test: ({ account }) => {
      expect(account.balance.toString()).toBe("0");
    },
  },
];

const bitcoin: AppSpec<Transaction> = {
  name: "Bitcoin",
  currency: getCryptoCurrencyById("bitcoin"),
  appQuery: {
    model: "nanoS",
    appName: "Bitcoin",
  },
  mutations: bitcoinLikeMutations(),
};

const bitcoinGold: AppSpec<Transaction> = {
  name: "Bitcoin Gold",
  currency: getCryptoCurrencyById("bitcoin_gold"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "BitcoinGold",
  },
  mutations: bitcoinLikeMutations(),
};

const bitcoinCash: AppSpec<Transaction> = {
  name: "Bitcoin Cash",
  currency: getCryptoCurrencyById("bitcoin_cash"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "BitcoinCash",
  },
  mutations: bitcoinLikeMutations(),
};

const peercoin: AppSpec<Transaction> = {
  name: "Peercoin",
  currency: getCryptoCurrencyById("peercoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Peercoin",
  },
  mutations: bitcoinLikeMutations(),
};

const pivx: AppSpec<Transaction> = {
  name: "PivX",
  currency: getCryptoCurrencyById("pivx"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "PivX",
  },
  mutations: bitcoinLikeMutations(),
};

const qtum: AppSpec<Transaction> = {
  name: "Qtum",
  currency: getCryptoCurrencyById("qtum"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Qtum",
  },
  mutations: bitcoinLikeMutations(),
};

const stakenet: AppSpec<Transaction> = {
  name: "Stakenet",
  currency: getCryptoCurrencyById("stakenet"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "XSN",
  },
  mutations: bitcoinLikeMutations(),
};

const stratis: AppSpec<Transaction> = {
  name: "Stratis",
  currency: getCryptoCurrencyById("stratis"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Stratis",
  },
  mutations: bitcoinLikeMutations(),
};

const vertcoin: AppSpec<Transaction> = {
  name: "Vertcoin",
  currency: getCryptoCurrencyById("vertcoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Vertcoin",
  },
  mutations: bitcoinLikeMutations(),
};

const viacoin: AppSpec<Transaction> = {
  name: "Viacoin",
  currency: getCryptoCurrencyById("viacoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Viacoin",
  },
  mutations: bitcoinLikeMutations(),
};

const dogecoin: AppSpec<Transaction> = {
  name: "DogeCoin",
  currency: getCryptoCurrencyById("dogecoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Dogecoin",
  },
  mutations: bitcoinLikeMutations({
    targetAccountSize: 5,
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("dogecoin").units[0],
      "1"
    ),
  }),
};

const zcash: AppSpec<Transaction> = {
  name: "ZCash",
  currency: getCryptoCurrencyById("zcash"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Zcash",
  },
  mutations: bitcoinLikeMutations({
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("zcash").units[0],
      "0.0002"
    ),
  }),
};

const zencash: AppSpec<Transaction> = {
  name: "Horizen",
  currency: getCryptoCurrencyById("zencash"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Horizen",
  },
  mutations: bitcoinLikeMutations({
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("zencash").units[0],
      "0.01"
    ),
  }),
};

const digibyte: AppSpec<Transaction> = {
  name: "Digibyte",
  currency: getCryptoCurrencyById("digibyte"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Digibyte",
  },
  mutations: bitcoinLikeMutations({
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("digibyte").units[0],
      "0.1"
    ),
  }),
};

const komodo: AppSpec<Transaction> = {
  name: "Komodo",
  currency: getCryptoCurrencyById("komodo"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Komodo",
  },
  mutations: bitcoinLikeMutations({
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("komodo").units[0],
      "0.1"
    ),
  }),
};

const litecoin: AppSpec<Transaction> = {
  name: "Litecoin",
  currency: getCryptoCurrencyById("litecoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Litecoin",
  },
  mutations: bitcoinLikeMutations({
    targetAccountSize: 3,
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("litecoin").units[0],
      "0.001"
    ),
  }),
};

const stealthcoin: AppSpec<Transaction> = {
  name: "Stealth",
  currency: getCryptoCurrencyById("stealthcoin"),
  dependency: "Bitcoin",
  appQuery: {
    model: "nanoS",
    appName: "Stealth",
  },
  mutations: bitcoinLikeMutations({
    minimalAmount: parseCurrencyUnit(
      getCryptoCurrencyById("stealthcoin").units[0],
      "0.1"
    ),
  }),
};

export default {
  bitcoin,
  dogecoin,
  zcash,
  zencash,
  litecoin,
  stealthcoin,
  komodo,
  digibyte,
  bitcoinGold,
  bitcoinCash,
  peercoin,
  pivx,
  qtum,
  stakenet,
  stratis,
  vertcoin,
  viacoin,
};
