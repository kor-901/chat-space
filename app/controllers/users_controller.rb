class UsersController < ApplicationController
	def edit
		@user = current_user
	end

	def update
		user = current_user
		user.update(user_params)
	end

	private
	def user_params
		params.require(:user).permit(:name, :email)
	end
end
