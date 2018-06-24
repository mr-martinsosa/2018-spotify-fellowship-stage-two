class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.datetime :start
      t.datetime :end
      t.string :description

      t.timestamps
    end
  end
end
