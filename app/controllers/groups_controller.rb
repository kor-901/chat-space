class GroupsController < ApplicationController
	def new
		@group = Group.new
		@users = User.order("name")
	end

	def create
	end

	def edit
	end

	def update
	end
end
