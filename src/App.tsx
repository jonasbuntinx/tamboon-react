import * as React from "react";
import * as Charity from "./Api/Charity";
import * as Payment from "./Api/Payment";
import { Button } from "./Components/Button";
import { Card } from "./Components/Card";
import { Donate } from "./Components/Donate";
import { matchSome, isSuccess } from "./Data/RemoteData";
import { useApi } from "./Hooks/Api";

type State = {
  donations: number;
  selectedCharity?: Charity.Charity;
};

type Actions = { tag: "SetDonations"; donations: number } | { tag: "SelectCharity"; selectedCharity?: Charity.Charity };

const reducer: React.Reducer<State, Actions> = (state: State, action: Actions) => {
  switch (action.tag) {
    case "SetDonations":
      return { ...state, donations: action.donations };
    case "SelectCharity":
      return { ...state, selectedCharity: action.selectedCharity };
    default:
      throw new Error();
  }
};

function App(): JSX.Element {
  const [charities, getCharities] = useApi<void, Charity.Charity[]>(Charity.get);

  const [payments, getPayments] = useApi<void, Payment.Payment[]>(Payment.get);

  const [, postPayment] = useApi<Payment.RequestBody, Payment.Payment>(Payment.post);

  const [state, dispatch] = React.useReducer(reducer, { donations: 0 });

  const getDonations = React.useCallback(
    () =>
      getPayments().then(function (resp) {
        const donations = matchSome(
          resp,
          {
            Success: items => items.reduce((accumulator, { amount }) => accumulator + amount, 0),
          },
          () => 0
        );
        dispatch({ tag: "SetDonations", donations });
      }),
    [getPayments]
  );

  React.useEffect(() => {
    getCharities();
    getDonations();
  }, [getCharities, getDonations]);

  return (
    <div className="max-w-screen-lg m-auto flex flex-col items-center p-8 space-y-8">
      <h1 className="text-2xl text-gray-500 font-bold tracking-wide">Omise Tamboon React</h1>
      <p className={["text-blue-600 font-bold", isSuccess(payments) ? "visible" : "invisible"].join(" ")}>
        All donations: {state.donations}
      </p>
      {matchSome(
        charities,
        {
          Success: items => (
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 row-auto">
              {items.map((charity, key) => {
                const showOverlay = state.selectedCharity && state.selectedCharity == charity;

                return (
                  <li key={key}>
                    <Card
                      image={charity.image}
                      overlay={
                        showOverlay ? (
                          <Donate
                            currency={charity.currency}
                            onClose={() => dispatch({ tag: "SelectCharity", selectedCharity: undefined })}
                            onClick={amount =>
                              postPayment({
                                charitiesId: charity.id,
                                amount: amount,
                                currency: charity.currency,
                              }).then(() => {
                                dispatch({ tag: "SelectCharity", selectedCharity: undefined });
                                getDonations();
                              })
                            }
                          />
                        ) : null
                      }
                    >
                      <span className="text-sm font-semibold text-gray-500 flex-1">{charity.name}</span>
                      <Button onClick={() => dispatch({ tag: "SelectCharity", selectedCharity: charity })}>
                        Donate
                      </Button>
                    </Card>
                  </li>
                );
              })}
            </ul>
          ),
        },
        () => (
          <></>
        )
      )}
      <br />
    </div>
  );
}

export { App };
