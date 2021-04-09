// A datatype representing fetched data

type NotAsked = { tag: "NotAsked" };

type Loading = { tag: "Loading" };

type Success<A> = { tag: "Success"; value: A };

type Failure<E> = { tag: "Failure"; value: E };

export type RemoteData<A, E> = NotAsked | Loading | Success<A> | Failure<E>;

export const NotAsked: RemoteData<never, never> = { tag: "NotAsked" };

export const Loading: RemoteData<never, never> = { tag: "Loading" };

export const Success = <A>(value: A): RemoteData<A, never> => ({ tag: "Success", value });

export const Failure = <E>(value: E): RemoteData<never, E> => ({ tag: "Failure", value });

export const isNotAsked = <A, E>(value: RemoteData<A, E>): value is NotAsked => value.tag === "NotAsked";

export const isLoading = <A, E>(value: RemoteData<A, E>): value is Loading => value.tag === "Loading";

export const isSuccess = <A, E>(value: RemoteData<A, E>): value is Success<A> => value.tag === "Success";

export const isFailure = <A, E>(value: RemoteData<A, E>): value is Failure<E> => value.tag === "Failure";

export const matchAll = <A, E, B>(
  value: RemoteData<A, E>,
  matcher: {
    NotAsked: () => B;
    Loading: () => B;
    Success: (value: A) => B;
    Failure: (value: E) => B;
  }
): B => {
  if (isSuccess(value)) return matcher.Success(value.value);
  else if (isFailure(value)) return matcher.Failure(value.value);
  else if (isNotAsked(value)) return matcher.NotAsked();
  else return matcher.Loading();
};

export const matchSome = <A, E, B>(
  value: RemoteData<A, E>,
  matcher: {
    NotAsked?: () => B;
    Loading?: () => B;
    Success?: (value: A) => B;
    Failure?: (value: E) => B;
  },
  fallback: () => B
): B => matchAll(value, { NotAsked: fallback, Loading: fallback, Success: fallback, Failure: fallback, ...matcher });
