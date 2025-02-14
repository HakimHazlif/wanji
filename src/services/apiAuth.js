import supabase, { supabaseUrl } from "./supabase";
import {
  authFailure,
  authStart,
  authSuccess,
  logOutSuccess,
  setUser,
  resetPassword,
} from "../features/Authentication/authSlice.js";

export const signup = (username, email, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { data: user, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          bio: "",
          avatar: "",
        },
      },
    });

    if (signupError) throw new Error(signupError.message);

    if (user) {
      const watchlistId = crypto.randomUUID();
      const favoriteId = crypto.randomUUID();

      const { error } = await supabase
        .from("lists")
        .insert([
          {
            id: watchlistId,
            user_id: user.user.id,
            name: "watchlist",
            description:
              "A space to track the titles you're interested in. Organize and manage them in the order that suits your preferences, ensuring you never lose track of what matters to you.",
          },
          {
            id: favoriteId,
            user_id: user.user.id,
            name: "favorite",
            description:
              "A collection of your most-loved titles. Save and revisit your favorites anytime, creating a personal library of content you enjoy the most.",
          },
        ])
        .select();

      if (error) throw new Error(error.message);
    }

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(authStart());

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // console.log(error);
      throw new Error(error.message);
    }

    console.log(user);

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(authStart());

    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const resetForgottenPassword = (email) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) throw new Error(error.message);

    dispatch(resetPassword());
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const updatePassword =
  (email, oldPassword, newPassword) => async (dispatch) => {
    if (!oldPassword || !newPassword) return;

    try {
      dispatch(authStart());

      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password: oldPassword,
      });

      if (error) {
        console.log(error);
        dispatch(authFailure(error.message));
        return;
      }

      if (user) {
        const { data: updatedUser, error2 } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error2) throw new Error(error2.message);

        dispatch(
          authSuccess({
            uid: updatedUser.user.id,
            username: updatedUser.user.user_metadata.username,
            email: updatedUser.user.email,
            bio: updatedUser.user.user_metadata.bio,
            avatar: updatedUser.user.user_metadata.avatar,
            createdAt: updatedUser.user.created_at,
            lastSignin: updatedUser.user.last_sign_in_at,
            lastUpdate: updatedUser.user.updated_at,
          })
        );
      }
    } catch (err) {
      dispatch(authFailure(err.message));
    }
  };

export const updateProfile =
  (username = "", bio = "", avatar = null) =>
  async (dispatch) => {
    if (!username && !bio) return;

    try {
      dispatch(authStart());
      const { data: user, error } = await supabase.auth.updateUser({
        data: { username, bio },
      });

      if (error) throw new Error(error.message);

      if (!avatar) {
        dispatch(
          authSuccess({
            uid: user.user.id,
            username: user.user.user_metadata.username,
            email: user.user.email,
            bio: user.user.user_metadata.bio,
            avatar: user.user.user_metadata.avatar,
            createdAt: user.user.created_at,
            lastSignin: user.user.last_sign_in_at,
            lastUpdate: user.user.updated_at,
          })
        );
        return;
      }

      const fileName = `avatar-${user.user.id}-${Math.random()}`;

      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (storageError) throw new Error(storageError.message);

      const { data: updatedUser, error: error2 } =
        await supabase.auth.updateUser({
          data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
          },
        });

      if (error2) throw new Error(error2.message);

      dispatch(
        authSuccess({
          uid: updatedUser.user.id,
          username: updatedUser.user.user_metadata.username,
          email: updatedUser.user.email,
          bio: updatedUser.user.user_metadata.bio,
          avatar: updatedUser.user.user_metadata.avatar,
          createdAt: updatedUser.user.created_at,
          lastSignin: updatedUser.user.last_sign_in_at,
          lastUpdate: updatedUser.user.updated_at,
        })
      );
    } catch (err) {
      dispatch(authFailure(err));
    }
  };

export const updateAuthPassword = (password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { data: user, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw new Error(error.message);

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(authStart());
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      dispatch(
        setUser({
          uid: user?.id ?? "",
          username: user?.user_metadata?.username ?? "",
          email: user?.email ?? "",
          bio: user?.user_metadata?.bio ?? "",
          avatar: user?.user_metadata?.avatar ?? "",
          createdAt: user?.created_at ?? "",
          lastSignin: user?.last_sign_in_at ?? "",
          lastUpdate: user?.updated_at ?? "",
        })
      );
    } else dispatch(logOutSuccess());
  } catch (err) {
    dispatch(authFailure(err));
  }
};
