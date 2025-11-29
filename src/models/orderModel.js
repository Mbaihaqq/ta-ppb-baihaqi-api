import supabase from "../config/supabaseClient.js";

export const OrderModel = {
  async create(order) {
    // Pastikan req.body di frontend mengirim field yang sesuai dengan tabel (user_name, outlet_id, weight, dll)
    const { data, error } = await supabase
      .from("orders")
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    // Mengambil data order beserta detail outletnya (relasi foreign key)
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        laundry_outlets ( id, name, address, phone )
      `)
      .order('pickup_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
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