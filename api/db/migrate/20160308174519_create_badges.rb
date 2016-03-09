class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :name
      t.integer :points, default: 0
      t.integer :boot_id

      t.timestamps null: false
    end
  end
end
