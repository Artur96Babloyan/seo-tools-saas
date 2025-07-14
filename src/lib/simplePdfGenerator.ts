import jsPDF from 'jspdf';

// Interface matching the actual CompetitorAnalysisComparison structure
interface PDFAnalysisData {
  mainDomain?: {
    domain: string;
    // ... other properties
  };
  competitors?: Array<{
    domain: string;
    // ... other properties
  }>;
  differences?: {
    summary: {
      mainDomain: string;
      overallScore: number;
      overallRank: number;
      totalCompetitors: number;
      strongestCategory: string;
      weakestCategory: string;
      analysisDate: string;
    };
    seoScores: {
      mainDomain: {
        domain: string;
        scores: {
          performance: number;
          seo: number;
          accessibility: number;
          bestPractices: number;
          overall: number;
        };
      };
      competitors: Array<{
        domain: string;
        scores: {
          performance: number;
          seo: number;
          accessibility: number;
          bestPractices: number;
          overall: number;
        };
      }>;
    };
    recommendations: string[];
    rankings?: unknown;
    scoreDifferences?: unknown;
    metaTagComparison?: unknown;
  };
  // Support for older structure where data is at top level
  summary?: {
    mainDomain: string;
    overallScore: number;
    overallRank: number;
    totalCompetitors: number;
    strongestCategory: string;
    weakestCategory: string;
    analysisDate: string;
  };
  seoScores?: {
    mainDomain: {
      domain: string;
      scores: {
        performance: number;
        seo: number;
        accessibility: number;
        bestPractices: number;
        overall: number;
      };
    };
    competitors: Array<{
      domain: string;
      scores: {
        performance: number;
        seo: number;
        accessibility: number;
        bestPractices: number;
        overall: number;
      };
    }>;
  };
  recommendations?: string[];
}

// Type for the differences object
interface DifferencesData {
  summary?: {
    mainDomain: string;
    overallScore: number;
    overallRank: number;
    totalCompetitors: number;
    strongestCategory: string;
    weakestCategory: string;
    analysisDate: string;
  };
  seoScores?: {
    mainDomain: {
      domain: string;
      scores: {
        performance: number;
        seo: number;
        accessibility: number;
        bestPractices: number;
        overall: number;
      };
    };
    competitors: Array<{
      domain: string;
      scores: {
        performance: number;
        seo: number;
        accessibility: number;
        bestPractices: number;
        overall: number;
      };
    }>;
  };
  recommendations?: string[];
  rankings?: unknown;
  scoreDifferences?: unknown;
  metaTagComparison?: unknown;
}

interface ReportData {
  id: string;
  analysis: PDFAnalysisData;
  exportedAt: string;
}

export class SimplePDFGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
    this.margin = 20;
    this.currentY = this.margin;
  }

  public generateReport(reportData: ReportData): void {
    const { analysis } = reportData;
    
    // Handle missing or incomplete data structure
    if (!analysis) {
      console.error('Analysis data is missing:', analysis);
      throw new Error('Analysis data is missing. Please run a new analysis.');
    }
    
    // Handle both nested and direct structure
    const differences = analysis.differences || analysis;
    const summary = differences.summary;
    const mainDomain = summary?.mainDomain || 'Unknown Domain';

    // Cover Page
    this.addCoverPage(mainDomain, summary || { overallScore: 0, overallRank: 1, totalCompetitors: 0 });
    
    // Executive Summary
    this.addNewPage();
    this.addExecutiveSummary(differences);
    
    // Performance Overview
    this.addPerformanceOverview(differences);
    
    // Recommendations
    this.addRecommendations(differences);
  }

  private addCoverPage(mainDomain: string, summary: { overallScore: number; overallRank: number; totalCompetitors: number }): void {
    // Header
    this.doc.setFillColor(59, 130, 246);
    this.doc.rect(0, 0, this.pageWidth, 60, 'F');
    
    // Title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(28);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Competitor Analysis Report', this.pageWidth / 2, 30, { align: 'center' });
    
    // Domain name
    this.doc.setFontSize(20);
    this.doc.text(mainDomain, this.pageWidth / 2, 45, { align: 'center' });
    
    // Main content
    this.currentY = 80;
    this.doc.setTextColor(31, 41, 55);
    
    // Performance box
    this.doc.setFillColor(249, 250, 251);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 80, 'F');
    
    this.currentY += 15;
    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Performance Summary', this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.currentY += 20;
    
    // Score display with fallback values
    const overallScore = summary?.overallScore || 0;
    const overallRank = summary?.overallRank || 1;
    const totalCompetitors = summary?.totalCompetitors || 0;
    
    this.doc.setFontSize(36);
    this.doc.setTextColor(...this.getScoreColorRGB(overallScore));
    this.doc.text(`${overallScore}`, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.currentY += 10;
    this.doc.setFontSize(14);
    this.doc.setTextColor(107, 114, 128);
    this.doc.text('Overall Score', this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.currentY += 15;
    this.doc.setFontSize(16);
    this.doc.setTextColor(31, 41, 55);
    this.doc.text(`Rank: #${overallRank} of ${totalCompetitors + 1}`, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    // Footer
    this.doc.setFontSize(12);
    this.doc.setTextColor(107, 114, 128);
    this.doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, this.pageWidth / 2, this.pageHeight - 40, { align: 'center' });
    
    this.doc.setFontSize(10);
    this.doc.text('Generated by SEO Tools SaaS', this.pageWidth / 2, this.pageHeight - 20, { align: 'center' });
  }

  private addExecutiveSummary(differences: DifferencesData): void {
    this.addSectionHeader('Executive Summary', 'SUMMARY');
    
    const summary = differences.summary;
    const seoScores = differences.seoScores;
    
    if (!summary || !seoScores) {
      this.doc.setFontSize(12);
      this.doc.setTextColor(31, 41, 55);
      this.doc.text('Summary data not available. Please run a new analysis.', this.margin, this.currentY);
      return;
    }
    
    this.currentY += 5;
    
    // Key findings
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(31, 41, 55);
    this.doc.text('Key Findings:', this.margin, this.currentY);
    this.currentY += 10;
    
    const findings = [
      `Your website ${summary.mainDomain} ranks #${summary.overallRank} out of ${summary.totalCompetitors + 1} competitors`,
      `Overall performance score: ${summary.overallScore}/100`,
      `Strongest area: ${summary.strongestCategory}`,
      `Needs improvement: ${summary.weakestCategory}`,
      `Total competitors analyzed: ${summary.totalCompetitors}`
    ];
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    findings.forEach((finding) => {
      this.doc.text(`• ${finding}`, this.margin + 5, this.currentY);
      this.currentY += 7;
    });
    
    this.currentY += 15;
    
    // Performance breakdown
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Performance Breakdown:', this.margin, this.currentY);
    this.currentY += 10;
    
    const scores = seoScores.mainDomain?.scores || { performance: 0, seo: 0, accessibility: 0, bestPractices: 0 };
    const categories = [
      { name: 'Performance', score: scores.performance },
      { name: 'SEO', score: scores.seo },
      { name: 'Accessibility', score: scores.accessibility },
      { name: 'Best Practices', score: scores.bestPractices }
    ];
    
    categories.forEach((category) => {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(31, 41, 55);
      
      // Category name and score
      this.doc.text(`${category.name}: ${category.score}/100`, this.margin + 5, this.currentY);
      
      // Visual bar
      const barWidth = 60;
      const barHeight = 4;
      const barX = this.margin + 80;
      const barY = this.currentY - 3;
      
      // Background bar
      this.doc.setFillColor(229, 231, 235);
      this.doc.rect(barX, barY, barWidth, barHeight, 'F');
      
      // Score bar
      const scoreWidth = (category.score / 100) * barWidth;
      this.doc.setFillColor(...this.getScoreColorRGB(category.score));
      this.doc.rect(barX, barY, scoreWidth, barHeight, 'F');
      
      this.currentY += 12;
    });
  }

  private addPerformanceOverview(differences: DifferencesData): void {
    this.addSectionHeader('Performance Overview', 'PERFORMANCE');
    
    const seoScores = differences.seoScores;
    
    if (!seoScores) {
      this.doc.setFontSize(12);
      this.doc.setTextColor(31, 41, 55);
      this.doc.text('Performance data not available. Please run a new analysis.', this.margin, this.currentY);
      return;
    }
    
    this.currentY += 5;
    
    // Main domain section
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(31, 41, 55);
    this.doc.text('Your Website:', this.margin, this.currentY);
    this.currentY += 10;
    
    const mainDomain = seoScores.mainDomain;
    if (mainDomain) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Domain: ${mainDomain.domain}`, this.margin + 5, this.currentY);
      this.currentY += 8;
      this.doc.text(`Overall: ${mainDomain.scores.overall}`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.text(`Performance: ${mainDomain.scores.performance}`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.text(`SEO: ${mainDomain.scores.seo}`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.text(`Accessibility: ${mainDomain.scores.accessibility}`, this.margin + 5, this.currentY);
      this.currentY += 6;
      this.doc.text(`Best Practices: ${mainDomain.scores.bestPractices}`, this.margin + 5, this.currentY);
      this.currentY += 15;
    }
    
    // Competitors section
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Competitors:', this.margin, this.currentY);
    this.currentY += 10;
    
    const competitors = seoScores.competitors || [];
    if (competitors.length === 0) {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text('No competitor data available.', this.margin + 5, this.currentY);
      return;
    }
    
    competitors.forEach((competitor: { domain: string; scores: { overall: number; performance: number; seo: number; accessibility: number; bestPractices: number; } }, index: number) => {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(`${index + 1}. ${competitor.domain}`, this.margin + 5, this.currentY);
      this.currentY += 8;
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(`Overall: ${competitor.scores.overall}`, this.margin + 10, this.currentY);
      this.currentY += 6;
      this.doc.text(`Performance: ${competitor.scores.performance}`, this.margin + 10, this.currentY);
      this.currentY += 6;
      this.doc.text(`SEO: ${competitor.scores.seo}`, this.margin + 10, this.currentY);
      this.currentY += 6;
      this.doc.text(`Accessibility: ${competitor.scores.accessibility}`, this.margin + 10, this.currentY);
      this.currentY += 6;
      this.doc.text(`Best Practices: ${competitor.scores.bestPractices}`, this.margin + 10, this.currentY);
      this.currentY += 12;
      
      if (this.currentY > this.pageHeight - 40) {
        this.addNewPage();
      }
    });
  }

  private addRecommendations(differences: DifferencesData): void {
    this.addSectionHeader('Recommendations & Action Items', 'RECOMMENDATIONS');
    
    const recommendations = differences.recommendations || [];
    
    this.currentY += 5;
    
    if (recommendations.length === 0) {
      this.doc.setFontSize(12);
      this.doc.setTextColor(31, 41, 55);
      this.doc.text('No specific recommendations available. Please run a new analysis.', this.margin, this.currentY);
      this.currentY += 15;
    } else {
      recommendations.forEach((recommendation: string, index: number) => {
        if (this.currentY > this.pageHeight - 60) {
          this.addNewPage();
        }
        
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(31, 41, 55);
        this.doc.text(`${index + 1}. Recommendation`, this.margin, this.currentY);
        this.currentY += 10;
        
        this.doc.setFont('helvetica', 'normal');
        
        // Split long recommendations into multiple lines
        const lines = this.doc.splitTextToSize(recommendation, this.pageWidth - 2 * this.margin - 10);
        lines.forEach((line: string) => {
          this.doc.text(line, this.margin + 5, this.currentY);
          this.currentY += 6;
        });
        
        this.currentY += 8;
      });
    }
    
    // Next Steps
    this.currentY += 10;
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Next Steps:', this.margin, this.currentY);
    this.currentY += 10;
    
    const nextSteps = [
      '1. Address high-priority recommendations first',
      '2. Monitor competitor performance regularly',
      '3. Implement SEO improvements gradually',
      '4. Schedule monthly performance reviews',
      '5. Track progress against competitors'
    ];
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    nextSteps.forEach((step) => {
      this.doc.text(step, this.margin + 5, this.currentY);
      this.currentY += 8;
    });
  }

  private addSectionHeader(title: string, icon: string): void {
    if (this.currentY > this.pageHeight - 60) {
      this.addNewPage();
    }
    
    this.doc.setFillColor(59, 130, 246);
    this.doc.rect(this.margin, this.currentY - 5, this.pageWidth - 2 * this.margin, 12, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`[${icon}] ${title}`, this.margin + 5, this.currentY + 3);
    
    this.currentY += 20;
    this.doc.setTextColor(31, 41, 55);
  }

  private addNewPage(): void {
    this.doc.addPage();
    this.currentY = this.margin;
  }

  private getScoreColorRGB(score: number): [number, number, number] {
    if (score >= 90) return [5, 150, 105]; // Green-600
    if (score >= 70) return [217, 119, 6]; // Amber-600
    if (score >= 50) return [234, 88, 12]; // Orange-600
    return [220, 38, 38]; // Red-600
  }

  public download(filename: string): void {
    this.doc.save(filename);
  }
}

export function generateSimpleCompetitorPDF(reportData: ReportData): void {
  try {
    const generator = new SimplePDFGenerator();
    generator.generateReport(reportData);
    
    // Handle both nested and direct structure for filename
    const differences = reportData.analysis.differences || reportData.analysis;
    const summary = differences.summary;
    const mainDomain = summary?.mainDomain || 'unknown-domain';
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `competitor-analysis-${mainDomain}-${dateStr}.pdf`;
    
    generator.download(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Re-throw with a more user-friendly message
    throw new Error(`Failed to generate PDF report: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 