class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.integer :group_id
      t.timestamps
    end
  end
end
