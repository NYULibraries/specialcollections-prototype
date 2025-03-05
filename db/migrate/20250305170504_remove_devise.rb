class RemoveDevise < ActiveRecord::Migration[8.0]
  def up
    drop_table :users
  end

  def self.down
    # There are no plans to support user accounts
    # If Devise is every to be re-introduced, it should be reinstalled from scratch
    raise ActiveRecord::IrreversibleMigration
  end
end
