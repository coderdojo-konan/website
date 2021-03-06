require 'oembed'
require 'shellwords'

OEmbed::Providers.register_all

module Jekyll
  class OEmbedTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      text = Liquid::Template.parse(@text).render context

      params = text.shellsplit
      url = params.shift
      params = Hash[*params.map{|val| val.split('=')}.flatten]

      resource = OEmbed::Providers.get(url, params)
      html = resource.html

      if url =~ /:\/\/(www.youtube.com|youtu.be)\//
        %w{width height}.each do |name|
           if params[name]
            html.gsub! Regexp.new(name+'="\\d+'), name+'="'+params[name]
          end
         end
      end

      "<div class='oembed #{resource.type}'>#{html}</div>"
    rescue OEmbed::NotFound
      warn "No embeddable content at #{url}"
      "<a href='#{url}'>#{url}</a>"
    end
  end
end

Liquid::Template.register_tag('emb', Jekyll::OEmbedTag)
