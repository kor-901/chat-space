FactoryBot.define do

  factory :message do
		text       {Faker::Lorem.sentence}
		image      {File.open(File.join(Rails.root, '/public/test/sky.jpg'))}
		created_at {Faker::Time.between_dates(from: 2.days.ago, to: Time.now, period: :all)}
		user
		group
  end

end