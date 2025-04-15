import supabase, { supabaseUrl } from "../../../services/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "userAuth/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
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

      if (signupError) return rejectWithValue(signupError.message);

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

        if (error) return rejectWithValue(error.message);
      }

      return {
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "userAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      return {
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk(
  "userAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) return rejectWithValue(error.message);

      return;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const resetForgottenPassword = createAsyncThunk(
  "userAuth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/update-password",
      });

      if (error) return rejectWithValue(error.message);

      return;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "userAuth/updatePassword",
  async ({ email, oldPassword, newPassword }, { rejectWithValue }) => {
    if (!oldPassword || !newPassword) return;

    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password: oldPassword,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      if (user) {
        const { data: updatedUser, error2 } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error2) return rejectWithValue(error2.message);

        return {
          uid: updatedUser.user.id,
          username: updatedUser.user.user_metadata.username,
          email: updatedUser.user.email,
          bio: updatedUser.user.user_metadata.bio,
          avatar: updatedUser.user.user_metadata.avatar,
          createdAt: updatedUser.user.created_at,
          lastSignin: updatedUser.user.last_sign_in_at,
          lastUpdate: updatedUser.user.updated_at,
        };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "userAuth/updateProfile",
  async ({ username = "", bio = "", avatar = null }, { rejectWithValue }) => {
    if (!username && !bio)
      return rejectWithValue("username and bio fields are empty");

    try {
      const { data: user, error } = await supabase.auth.updateUser({
        data: { username, bio },
      });

      if (error) return rejectWithValue(error.message);

      if (!avatar) {
        return {
          uid: user.user.id,
          username: user.user.user_metadata.username,
          email: user.user.email,
          bio: user.user.user_metadata.bio,
          avatar: user.user.user_metadata.avatar,
          createdAt: user.user.created_at,
          lastSignin: user.user.last_sign_in_at,
          lastUpdate: user.user.updated_at,
        };
      }

      const fileName = `avatar-${user.user.id}-${Math.random()}`;

      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

      if (storageError) return rejectWithValue(storageError.message);

      const { data: updatedUser, error: error2 } =
        await supabase.auth.updateUser({
          data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
          },
        });

      if (error2) return rejectWithValue(error2.message);

      return {
        uid: updatedUser.user.id,
        username: updatedUser.user.user_metadata.username,
        email: updatedUser.user.email,
        bio: updatedUser.user.user_metadata.bio,
        avatar: updatedUser.user.user_metadata.avatar,
        createdAt: updatedUser.user.created_at,
        lastSignin: updatedUser.user.last_sign_in_at,
        lastUpdate: updatedUser.user.updated_at,
      };
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateAuthPassword = createAsyncThunk(
  "userAuth/updatePassword",
  async (password, { rejectWithValue }) => {
    try {
      const { data: user, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) rejectWithValue(error.message);

      return {
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        bio: user.user.user_metadata.bio,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      };
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  "userAuth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return {
          uid: user?.id ?? "",
          username: user?.user_metadata?.username ?? "",
          email: user?.email ?? "",
          bio: user?.user_metadata?.bio ?? "",
          avatar: user?.user_metadata?.avatar ?? "",
          createdAt: user?.created_at ?? "",
          lastSignin: user?.last_sign_in_at ?? "",
          lastUpdate: user?.updated_at ?? "",
        };
      }
      return rejectWithValue("User not logged in");
    } catch {
      return rejectWithValue("User not logged in");
    }
  }
);
