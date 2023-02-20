class ContentTypeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.attached? && !value.content_type.in?(content_types)
      value.purge if record.new_record? # Only purge the offending blob if the record is new
      record.errors.add(attribute, :content_type_invalid)
    end
  end

  private

  def content_types
    options.fetch(:in)
  end
end