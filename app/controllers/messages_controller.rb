class MessagesController < ApplicationController
	def index
		@group = Group.find(params[:group_id])
		@users = @group.users
	end

	def create
		message = Message.new(message_params)
		if message.save
			group = Group.find(params[:group_id])
			redirect_to group_messages_path(group), notice: "メッセージが送信されました"
		else
		end
	end

	private
	def message_params
		params.require(:message).permit(:text, :image).merge(user_id: current_user.id, group_id: params[:group_id])
	end
end
