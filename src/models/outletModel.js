import { supabase } from "../config/supabaseClient.js";

export const OutletModel = {
  async create(outlet) {
    const { data, error } = await supabase
      .from("laundry_outlets")
      .insert([outlet])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("laundry_outlets")
      .select("*");

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("laundry_outlets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, outlet) {
    const { data, error } = await supabase
      .from("laundry_outlets")
      .update(outlet)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from("laundry_outlets")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { message: "Outlet deleted" };
  },
};
