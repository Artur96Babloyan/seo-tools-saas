import reportService from '../services/reportService';
import { formatResponse, asyncHandler } from '../utils/helpers';

class ReportController {
  /**
   * POST /api/report/save
   * Save an analysis report to the database
   */
  saveReport = asyncHandler(async (req, res) => {
    const { website_url, analysis_result } = req.body;
    const userId = req.user.id; // User ID from authentication middleware

    const savedReport = await reportService.saveReport(
      website_url,
      analysis_result,
      userId
    );

    res.status(201).json(
      formatResponse.success(
        {
          id: savedReport.id,
          website_url: savedReport.websiteUrl,
          created_at: savedReport.createdAt,
        },
        'Analysis report saved successfully'
      )
    );
  });

  /**
   * GET /api/report/list
   * Get all analysis reports with pagination
   */
  getAllReports = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      websiteUrl
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    const result = await reportService.getAllReports({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      userId,
      websiteUrl
    });

    res.status(200).json(
      formatResponse.success(
        {
          reports: result.reports,
          pagination: result.pagination,
        },
        'Reports retrieved successfully'
      )
    );
  });

  /**
   * GET /api/report/:id
   * Get a specific report by ID
   */
  getReportById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    const report = await reportService.getReportById(id, userId);

    if (!report) {
      return res.status(404).json(
        formatResponse.error('Report not found', 404)
      );
    }

    res.status(200).json(
      formatResponse.success(report, 'Report retrieved successfully')
    );
  });

  /**
   * GET /api/report/website/:websiteUrl
   * Get reports for a specific website
   */
  getReportsByWebsite = asyncHandler(async (req, res) => {
    const { websiteUrl } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    // Decode the URL parameter
    const decodedUrl = decodeURIComponent(websiteUrl);

    const result = await reportService.getReportsByWebsite(decodedUrl, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
      userId
    });

    res.status(200).json(
      formatResponse.success(
        {
          website_url: decodedUrl,
          reports: result.reports,
          pagination: result.pagination,
        },
        'Website reports retrieved successfully'
      )
    );
  });

  /**
   * DELETE /api/report/:id
   * Delete a report by ID
   */
  deleteReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    const success = await reportService.deleteReport(id, userId);

    if (!success) {
      return res.status(404).json(
        formatResponse.error('Report not found', 404)
      );
    }

    res.status(200).json(
      formatResponse.success(
        { deleted: true },
        'Report deleted successfully'
      )
    );
  });

  /**
   * PUT /api/report/:id
   * Update a report by ID
   */
  updateReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { website_url, analysis_result } = req.body;
    const userId = req.user.id; // User ID from authentication middleware

    const updateData = {};
    if (website_url) updateData.website_url = website_url;
    if (analysis_result) updateData.analysis_result = analysis_result;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json(
        formatResponse.error('No valid fields provided for update', 400)
      );
    }

    const updatedReport = await reportService.updateReport(id, updateData, userId);

    res.status(200).json(
      formatResponse.success(updatedReport, 'Report updated successfully')
    );
  });

  /**
   * GET /api/report/statistics
   * Get report statistics and analytics
   */
  getStatistics = asyncHandler(async (req, res) => {
    const userId = req.user.id; // User ID from authentication middleware

    const statistics = await reportService.getReportStatistics(userId);

    res.status(200).json(
      formatResponse.success(statistics, 'Report statistics retrieved successfully')
    );
  });

  /**
   * GET /api/report/search
   * Search reports by website URL
   */
  searchReports = asyncHandler(async (req, res) => {
    const {
      q: query,
      page = 1,
      limit = 10
    } = req.query;

    const userId = req.user.id; // User ID from authentication middleware

    if (!query) {
      return res.status(400).json(
        formatResponse.error('Search query is required', 400)
      );
    }

    const result = await reportService.searchReports(query, {
      page: parseInt(page),
      limit: parseInt(limit),
      userId
    });

    res.status(200).json(
      formatResponse.success(
        {
          query: result.query,
          reports: result.reports,
          pagination: result.pagination,
        },
        'Search completed successfully'
      )
    );
  });

  /**
   * GET /api/report/:id/download
   * Download a report as a text file
   */
  downloadReport = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // User ID from authentication middleware

    try {
      const reportFile = await reportService.getReportFile(id, userId);

      if (!reportFile) {
        return res.status(404).json(
          formatResponse.error('Report file not found', 404)
        );
      }

      // Set headers for file download
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${reportFile.filename}"`);
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

      // Send the file content
      res.status(200).send(reportFile.content);
    } catch {
      return res.status(500).json(
        formatResponse.error('Failed to download report', 500)
      );
    }
  });
}

module.exports = new ReportController(); 