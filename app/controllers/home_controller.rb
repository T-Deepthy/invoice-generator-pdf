class HomeController < ApplicationController
  def welcome
  end
  def print_invoice
    respond_to do |format|
      format.html
      format.pdf do
        render pdf:
    params[:filename],
                      page_size: 'A4',
                      dpi: '300'
      end
    end
  end
end
