import { supabase } from './supabase';
import { handleSupabaseResponse } from './supabase';

// Generic database service for CRUD operations
export class DatabaseService<T> {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  // Get all records
  async getAll(): Promise<T[]> {
    const response = await supabase.from(this.table).select('*');

    return handleSupabaseResponse(response) || [];
  }

  // Get a record by ID
  async getById(id: string | number): Promise<T | null> {
    const response = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response);
  }

  // Create a new record
  async create(data: Partial<T>): Promise<T | null> {
    const response = await supabase
      .from(this.table)
      .insert(data)
      .select()
      .single();

    return handleSupabaseResponse(response);
  }

  // Update a record
  async update(id: string | number, data: Partial<T>): Promise<T | null> {
    const response = await supabase
      .from(this.table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response);
  }

  // Delete a record
  async delete(id: string | number): Promise<void> {
    const response = await supabase.from(this.table).delete().eq('id', id);

    handleSupabaseResponse(response);
  }

  // Custom query with filters
  async query(column: string, operator: string, value: any): Promise<T[]> {
    const response = await supabase
      .from(this.table)
      .select('*')
      .filter(column, operator, value);

    return handleSupabaseResponse(response) || [];
  }
}
