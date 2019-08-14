require 'rails_helper'

describe MessagesController do
	let(:user) {create(:user)}
	let(:group) {create(:group)}

	describe 'GET #index' do
		
		context 'log in' do
			before do
				login user
				get :index, params: {group_id: group.id}
			end
			
			it "assigns the requested group to @group" do
				expect(assigns(:group)).to eq group
			end

			it 'assigns the new message to @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

			it "renders the :index template" do
				expect(response).to render_template :index
			end
		end

		context 'not log in' do
			before do
				get :index, params: {group_id: group}
			end

			it "redirect to new_user_session_path" do
				expect(response).to redirect_to(new_user_session_path)
			end
		end

	end

	describe 'POST #create' do
		let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

		context 'log in' do
			before do
				login user
			end

			context "can save" do
				subject {post :create, params: params}

				it "count up message" do
					# message = build(:message)
					# expect(message.save).to be_truthy
					expect{subject}.to change(Message, :count).by(1)
				end

				it "redirect to group_messages_path" do
					subject
					expect(response).to redirect_to(group_messages_path(group))
				end
			end

			context 'can not save' do
				let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil)}}
				subject {post :create, params: invalid_params}

				it "does not count up" do
					# message = Message.new
					# expect(message.save).to be_falsey
					expect{subject}.not_to change(Message, :count)
				end
	
				it "renders the :index template" do
					subject
					expect(response).to render_template :index
				end
			end

		end

		context 'not log in' do

			it "redirect to new_user_session_path" do
				post :create, params: params
				expect(response).to redirect_to(new_user_session_path)
			end

		end
	end

end