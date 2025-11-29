import supabase from "../config/supabaseClient.js";

export const OrderModel = {
  async create(order) {
    const { data, error } = await supabase
      .from("orders")
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        user_name,
        pickup_date,
        finish_date,
        status,
        weight,
        price,
        laundry_outlets ( id, name, address, phone )
      `);

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        user_name,
        pickup_date,
        finish_date,
        status,
        weight,
        price,
        laundry_outlets ( id, name, address, phone )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, order) {
    const { data, error } = await supabase
      .from("orders")
      .update(order)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { message: "Order deleted" };
  },
};
