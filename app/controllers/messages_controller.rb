class MessagesController < ApplicationController
	before_action :set_group

	def index
		@messages = @group.messages.includes(:user)
		@users = @group.users
	end

	def create
		message = Message.new(message_params)
		if message.save
			redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
		else
			flash.now[:alert] = "メッセージを入力してください"
			@users = @group.users
			render :index
		end
	end

	private
	def message_params
		params.require(:message).permit(:text, :image).merge(user_id: current_user.id, group_id: params[:group_id])
	end

	def set_group
		@group = Group.find(params[:group_id])
	end
end
