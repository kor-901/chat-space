class Group < ApplicationRecord
	has_many :messages
	has_many :members
	has_many :users, through: :members
	validates :name, presence: true, uniqueness: true

	def show_last_message
		if (last_message = messages.order("created_at").last).present?
			last_message.text? ? last_message.text : "画像が投稿されています"
		else
			"まだメッセージがありません"
		end
	end
end
